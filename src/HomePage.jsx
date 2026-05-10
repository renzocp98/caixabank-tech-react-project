import { useEffect, useState } from 'react'
import CoinTable from '#components/CoinTable.jsx';
import NftTable from '#components/NftTable.jsx';

export default function HomePage(){
    const [coindata, setCoindata] = useState([]);
    const [nftdata, setNftdata ] = useState([]);

    const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
    
    const loadCOinData = async () => {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&x_cg_demo_api_key=${API_KEY}`);
        return await response.json();
    }

    const loadNFTsData = async () => {
        const response = await fetch(`https://api.coingecko.com/api/v3/nfts/list?per_page=8&page=1&x_cg_demo_api_key=${API_KEY}`);
        return await response.json();
    }
    
    useEffect(() => {
        loadCOinData().then(setCoindata);
        loadNFTsData().then(setNftdata);
    }, []);
    
    if (coindata.length === 0 && nftdata.length === 0) return <p>Cargando...</p>
    
    return (
         <>
            <header >
              <h1 className="text-center p-6" >Coins  and NFTs Dashboard</h1>
            </header>
            <section className="pl-10 flex justify-center gap-50 px-10 py-6">
                    <CoinTable coindata={coindata} className="p-5"/>
                    <NftTable nftdata={nftdata}/>
            </section>
        </>
        
    )
}