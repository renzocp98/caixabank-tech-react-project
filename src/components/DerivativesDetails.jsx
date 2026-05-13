import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { useParams } from "react-router-dom";
import { $derivativeId, $derivativeDetail, $derivativeDetailLoading } from "../stores/derivativesStore";

export default function DerivativesDetails() {
  const { id } = useParams();
  const exchange = useStore($derivativeDetail);
  const loading = useStore($derivativeDetailLoading);

  useEffect(() => {
    $derivativeId.set(id);
  }, [id]);

  if (loading) return <div>Loading Data....</div>;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center gap-4">
          <img src={exchange.image} alt={exchange.name} className="w-14 h-14 rounded-xl" />
        <div>
          <h1 className="text-2xl text-white">{exchange.name}</h1>
          <span className="text-gray-400 text-sm">{exchange.country}</span>
          <span className="text-gray-400 text-sm ml-2">· Est. {exchange.year_established}</span>
        </div>
          <a href={exchange.url} target="_blank" className="ml-auto text-cg-green hover:underline text-sm">
            🌐 Website
          </a>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Volumen 24h (BTC)', value: exchange.trade_volume_24h_btc != null ? `${Number(exchange.trade_volume_24h_btc).toLocaleString()} BTC` : null },
          { label: 'Open Interest (BTC)', value: exchange.open_interest_btc != null ? `${Number(exchange.open_interest_btc).toLocaleString()} BTC` : null },
          { label: 'Pares Perpetuos', value: exchange.number_of_perpetual_pairs },
          { label: 'Pares Futuros', value: exchange.number_of_futures_pairs },
        ].filter(item => item.value != null).map(({ label, value }) => (
          <div key={label} className="bg-cg-card-green rounded-xl p-4">
            <div className="text-cg-green text-sm mb-1">{label}</div>
            <div className="text-white text-xl font-semibold">{value}</div>
          </div>
        ))}
      </div>

      <div className="text-gray-300">
        <h3 className="text-white text-lg mb-2">Sobre {exchange.name}</h3>
        <p>{exchange.description}</p>
      </div>
        <div className="bg-cg-card-green rounded-xl p-4">
          <h3 className="text-cg-green text-sm mb-3">Contratos activos</h3>
          <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
            {exchange.tickers.slice(0, 20).map((ticker, i) => (
              <div key={i} className="flex justify-between text-sm border-b border-cg-green/10 pb-1">
                <span className="text-white">{ticker.symbol}</span>
                <span className="text-gray-400">{ticker.contract_type}</span>
                <span className="text-white">${Number(ticker.last).toLocaleString()}</span>
                <span className={Number(ticker.funding_rate) >= 0 ? "text-green-400" : "text-red-400"}>
                  {ticker.funding_rate != null ? `${(Number(ticker.funding_rate) * 100).toFixed(4)}%` : '—'}
                </span>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}
