import { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import styles from "./Coin.module.css";

const Coin = ({ coin }) => {
  const [price, setPrice] = useState(coin.market_data.current_price.usd)
  const ws = useRef(null);
  const t = coin.symbol.toUpperCase() + "-USD"
  useEffect(() => {
    ws.current = new WebSocket(process.env.NEXT_PUBLIC_COINBASE_WS_API);
    let msg = {
      type: "subscribe",
      product_ids: [t],
      channels: ["ticker"]
    };
    let jsonMsg = JSON.stringify(msg);
    
    ws.current.addEventListener('open', () => {
      if(ws.current.readyState === 1){
        ws.current.send(jsonMsg);
      }
    })

    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      setPrice(data.price)
      // console.log(data.price);
    }
  }, [])

  return (
    <Layout>
      <div className={styles.coin_page}>
        <div className={styles.coin_container}>
          <img  src={coin.image.large} al={coin.name} className={styles.coin_image} />
          <h1 className={styles.coin_name}>{coin.name}</h1>
          <p className={styles.coin_ticker}>{coin.symbol.toUpperCase()}</p>
          <p className={styles.coin_current}>
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

export default Coin;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  const data = await res.json();

  return {
    props: {
      coin: data,
    },
  }
}
