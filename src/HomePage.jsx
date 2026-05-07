import { useEffect, useState } from 'react'

export default function HomePage(){
    const [coindata, setCoindata] = useState([]);
    const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
    
    const loadData = async () => {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/global?x_cg_demo_api_key=${API_KEY}`);
        return await response.json();
    }

    useEffect(() => {
        loadData().then(setCoindata);
    }, []);


    

    return (
        <main>
            {JSON.stringify(coindata)}
        </main>
        
    )
}