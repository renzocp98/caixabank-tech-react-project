import { useEffect } from "react"
import { useStore } from "@nanostores/react"
import { useParams } from "react-router-dom"
import { $coinId, $coinDetail, $coinDetailLoading } from "../stores/coinsStore"
import PriceChange from "./PriceChange"

export default function CoinsDetails() {
  const { id } = useParams()
  const coinDetail = useStore($coinDetail)
  const loading = useStore($coinDetailLoading)

  useEffect(() => {
    $coinId.set(id)
  }, [id])

  if (loading) return <div>Loading Data....</div>

  return (
    <div className="p-6 flex flex-col gap-6">

      <div className="flex items-center gap-4">
        <img src={coinDetail.image.large} className="w-16 h-16" />
        <div>
          <h1 className="text-2xl">{coinDetail.name}</h1>
          <span className="text-gray-400">{coinDetail.symbol}</span>
        </div>
        <span className="ml-auto text-gray-400">Rank #{coinDetail.market_cap_rank}</span>
      </div>

      <div className="items-center gap-4">
        <h2 className="text-4xl">${coinDetail.market_data.current_price.usd.toLocaleString()}</h2>
        <PriceChange value={coinDetail.market_data.price_change_percentage_24h} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Market Cap', value: `$${coinDetail.market_data.market_cap.usd.toLocaleString()}` },
          { label: 'Volume 24h', value: `$${coinDetail.market_data.total_volume.usd.toLocaleString()}` },
          { label: 'Circulating Supply', value: coinDetail.market_data.circulating_supply.toLocaleString() },
          { label: 'Max Supply', value: coinDetail.market_data.max_supply?.toLocaleString() ?? '∞' },
          { label: 'ATH', value: `$${coinDetail.market_data.ath.usd.toLocaleString()}` },
          { label: 'ATL', value: `$${coinDetail.market_data.atl.usd.toLocaleString()}` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-cg-card-green rounded-xl p-4 gap-1">
            <div className="text-cg-green text-sm">{label}</div>
            <div>{value}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <span className="text-green-400">👍 {coinDetail.sentiment_votes_up_percentage}%</span>
        <span className="text-red-400">👎 {coinDetail.sentiment_votes_down_percentage}%</span>
        <span className="text-gray-400">👁 {coinDetail.watchlist_portfolio_users.toLocaleString()} usuarios</span>
      </div>

      <div className="text-gray-300">
        <h3 className="text-white text-lg mb-2">Sobre {coinDetail.name}</h3>
        <p dangerouslySetInnerHTML={{ __html: coinDetail.description.en }} />
      </div>

    </div>
  )
}
