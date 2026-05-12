import { AppContext } from "#main.jsx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PriceChange from "./PriceChange";

export default function NFTsDetails(){
    const { apiKey, rootURL } = useContext(AppContext);
    const { id } = useParams();
    const [nftDetail, setNftDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadNFTDetails = async () => {
    const response = await fetch(
      `${rootURL}nfts/${id}?x_cg_demo_api_key=${apiKey}`
    );
    return await response.json();
    }

    useEffect(() => {
        setLoading(true)
        loadNFTDetails().then(data => {
        setNftDetail(data)
        setLoading(false)
    })}, [id])

    if(loading) return <div>Loading Data....</div>

    return(
        <div className="p-6 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <img src={nftDetail.image.small} className="w-16 h-16 rounded-xl" />
              <div>
                <h1 className="text-2xl">{nftDetail.name}</h1>
                <span className="text-gray-400">{nftDetail.symbol}</span>
              </div>
              <span className="ml-auto text-gray-400">Rank #{nftDetail.market_cap_rank}</span>
            </div>

            <div className="flex items-center gap-4">
              <h2 className="text-4xl">${nftDetail.floor_price.usd.toLocaleString()}</h2>
              <PriceChange value={nftDetail.floor_price_in_usd_24h_percentage_change} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Market Cap', value: `$${nftDetail.market_cap.usd.toLocaleString()}` },
                { label: 'Volume 24h', value: `$${nftDetail.volume_24h.usd.toLocaleString()}` },
                { label: 'Total Supply', value: nftDetail.total_supply.toLocaleString() },
                { label: 'Unique Holders', value: nftDetail.number_of_unique_addresses.toLocaleString() },
                { label: 'ATH', value: `$${nftDetail.ath.usd.toLocaleString()}` },
                { label: 'Sales Today', value: nftDetail.one_day_sales },
              ].map(({ label, value }) => (
                <div key={label} className="bg-cg-card-green rounded-xl p-4 gap-1">
                  <div className="text-cg-green text-sm">{label}</div>
                  <div>{value}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              {nftDetail.links.homepage && <a href={nftDetail.links.homepage} target="_blank" className="text-cg-green hover:underline">🌐 Website</a>}
              {nftDetail.links.twitter && <a href={nftDetail.links.twitter} target="_blank" className="text-cg-green hover:underline">🐦 Twitter</a>}
              {nftDetail.links.discord && <a href={nftDetail.links.discord} target="_blank" className="text-cg-green hover:underline">💬 Discord</a>}
            </div>

            <div className="text-gray-300">
              <h3 className="text-white text-lg mb-2">Sobre {nftDetail.name}</h3>
              <p>{nftDetail.description}</p>
            </div>

        </div>
    )
}