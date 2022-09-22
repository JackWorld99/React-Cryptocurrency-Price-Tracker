import { useState } from "react";
import CoinList from "../components/CoinList";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Layout from "../components/Layout";

export default function Home({filteredCoins}) {
  const [search, setSearch] = useState("");
  const allCoins = filteredCoins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  return (
    <div>
      <Layout>
        <div className="coin_app">
          <SearchBar type="text" placeholder="Search" onChange={handleChange} />
          <Header />
          <CoinList filteredCoins={allCoins} />
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false")
  const filteredCoins = await res.json()

  return {
    props: {
      filteredCoins,
    },
  }
}
