import { useEffect, useState } from 'react'

export default function HomePage(){
    const [coindata, setCoindata] = useState([]);
    const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
    
    const loadData = async () => {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&x_cg_demo_api_key=${API_KEY}`);
        return await response.json();
    }
    
    useEffect(() => {
        loadData().then(setCoindata);
    }, []);
    
    if (coindata.length === 0) return <p>Cargando...</p>
    
    return (
         <div>
            <header>
              <h1>Coins Dashboard</h1>
            </header>
            <section>
              <h2>Top Coins</h2>
              <div>
                <ol className="list-decimal pl-10">
                    {coindata.map(coin => ( 
                    <li key={coin.id}> 
                    {coin.name} - {coin.current_price}
                    </li>
                ))}
                </ol>
              </div>
            </section>
        </div>
        
    )
}