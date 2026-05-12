import { AppContext } from "#main.jsx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DerivativesDetails() {
  const { apiKey, rootURL } = useContext(AppContext);
  const { id } = useParams();
  const [exchange, setExchange] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadExchangeDetails = async () => {
    const response = await fetch(
      `${rootURL}derivatives/exchanges/${id}?include_tickers=unexpired&x_cg_demo_api_key=${apiKey}`
    );
    return await response.json();
  }

  useEffect(() => {
    setLoading(true);
    loadExchangeDetails().then(data => {
      setExchange(data);
      setLoading(false);
    });
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
      
    </div>
  );
}
