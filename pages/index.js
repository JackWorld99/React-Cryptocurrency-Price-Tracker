import { useState, useEffect } from "react" 
import CoinList from "../components/CoinList" 
import Header from "../components/Header" 
import SearchBar from "../components/SearchBar" 
import Layout from "../components/Layout" 

export default function Home({coinsData}) {
  const [search, setSearch] = useState("") 
  const [data, setData] = useState(coinsData) 

  const handleChange = (e) => {
    e.preventDefault() 
    setSearch(e.target.value) 
  }

  useEffect(() => {
    let isMounted = true
    const fetchData = async() => {
      const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false")
      const json = await res.json()
      setData(json)
    }

    const interval = setInterval(() => {
      if(isMounted){
        fetchData()
      }
    }, 30000) 

    return () => {
      clearInterval(interval) 
      isMounted = false
    }
  }, []) 

  return (
    <div>
      <Layout>
        <div className="coin_app">
          <SearchBar type="text" placeholder="Search" onChange={handleChange} />
          <Header />
          <CoinList filteredCoins={data.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))} />
        </div>
      </Layout>
    </div>
  ) 
}

export const getServerSideProps = async () => {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false")
  const coinsData = await res.json()

  return {
    props: {
      coinsData,
    },
  }
}
