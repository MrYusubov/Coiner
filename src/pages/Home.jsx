import React from "react";
import homeStore from "../stores/homeStore";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ListItem from "../components/ListItem";


export default function Home() {
    const store = homeStore()
    React.useEffect(() => {
        store.fetchCoins()
    }, [])
    return (
        <div>
            <Header />
            <header className="home-search">
                <div className="width">
                    <h2>Seacrch for a coin</h2>
                    <div className="home-search-input">
                        <input type="text" value={store.query} onChange={store.setQuery} />
                    </div>
                </div>
            </header>
            <div className="home-cryptos">
                <div className="width">
                    <h2>{store.searched ? "Search Results": "Trending Coins"}</h2>
                    <div className="home-cryptos-list">
                        {store.coins.map(coin => {
                            return (
                                <ListItem key={coin.id} coin={coin} />
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}