import { useEffect, useRef, useState } from "react" 
import Layout from "../../components/Layout" 
import styles from "./Coin.module.css" 

const Coin = ({ coin }) => {
  const [price, setPrice] = useState(coin.market_data.current_price.usd)
  const ws = useRef(null) 
  const product_id = coin.symbol.toUpperCase() + "-USD" 
  const colors = useRef(null) 

  useEffect(() => {
    let isMounted = true

    ws.current = new WebSocket(process.env.NEXT_PUBLIC_COINBASE_WS_API) 

    let msg = {
      type: "subscribe",
      product_ids: [product_id],
      channels: ["ticker"]
    }

    let jsonMsg = JSON.stringify(msg) 

    ws.current.addEventListener('open', () => {
      if(ws.current.readyState === 1){
        ws.current.send(jsonMsg) 
      }
    })

    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data) 
      if(isMounted){
        colors.current.style.color = (!data.price || price === data.price) ? "white" : data.price > price ? "green" : "red"
        setPrice(data.price)
      }
    }
    return () => isMounted = false
  }, [])

  return (
    <Layout>
      <div className={styles.coin_page}>
        <div className={styles.coin_container}>
          <img  src={coin.image.large} al={coin.name} className={styles.coin_image} />
          <h1 className={styles.coin_name}>{coin.name}</h1>
          <p className={styles.coin_ticker}>{coin.symbol.toUpperCase()}</p>
          <p className={styles.coin_current} ref={colors}>
             {price ?  "$ " + price : "$ " + coin.market_data.current_price.usd}
          </p>
          <div style={{fontSize: '12px'}}>
              {!price ? coin.name + " don't have USD pair on Coinbase" : ""}
          </div>
        </div> 
      </div>
    </Layout>
  )
}

export default Coin 

export async function getServerSideProps(context) {
  const { id } = context.query 
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`) 
  const data = await res.json() 

  return {
    props: {
      coin: data,
    },
  }
}
