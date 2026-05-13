import { useStore } from "@nanostores/react";
import { Link } from "react-router-dom";
import { $search, $searchResults } from "../stores/searchStore";

const SectionData = ({ title, items, renderItem }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-cg-green text-sm font-semibold uppercase tracking-wide">{title}</h2>
      {items.slice(0, 6).map(renderItem)}
    </div>
  )
}

export default function SearchResults() {
  
  const search = useStore($search);
  const results = useStore($searchResults);

  if (!search) return (
    <div className="p-6 text-gray-400 text-center">Escribe algo para buscar...</div>
  )

  if (!results) return (
    <div className="p-6 text-gray-400 text-center">Buscando...</div>
  )

  return (
    <div className="p-6 flex flex-col gap-8">
      <h1 className="text-xl text-white">Resultados para <span className="text-cg-green">"{search}"</span></h1>
      <SectionData
        title="Coins"
        items={results.coins}
        renderItem={(coin) => (
          <Link key={coin.id} to={`/coins/${coin.id}`} className="flex items-center gap-3 bg-cg-card-green hover:bg-cg-card-blue rounded-xl p-3 transition-colors">
            <img src={coin.thumb}className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <span className="text-white text-sm">{coin.name}</span>
              <span className="text-gray-400 text-xs ml-2">{coin.symbol}</span>
            </div>
            {coin.market_cap_rank && (
              <span className="text-gray-400 text-xs">#{coin.market_cap_rank}</span>
            )}
          </Link>
        )}
      />
      <SectionData
        title="NFTs"
        items={results.nfts}
        renderItem={(nft) => (
          <Link key={nft.id} to={`/nfts/${nft.id}`} className="flex items-center gap-3 bg-cg-card-green hover:bg-cg-card-blue rounded-xl p-3 transition-colors">
            <img src={nft.thumb} className="w-8 h-8 rounded-xl" />
            <div>
              <span className="text-white text-sm">{nft.name}</span>
              <span className="text-gray-400 text-xs ml-2">{nft.symbol}</span>
            </div>
          </Link>
        )}
      />
      <SectionData
        title="Exchanges de Derivados"
        items={results.exchanges.filter(ex => ex.market_type === "futures")}
        renderItem={(ex) => (
          <Link key={ex.id} to={`/derivatives/${ex.id}`} className="flex items-center gap-3 bg-cg-card-green hover:bg-cg-card-blue rounded-xl p-3 transition-colors">
            <img src={ex.thumb} className="w-8 h-8 rounded-xl" />
            <span className="text-white text-sm">{ex.name}</span>
          </Link>
        )}
      />
      {!results.coins.length && !results.nfts.length && !results.exchanges.length && (
        <p className="text-gray-400 text-center">Sin resultados para "{search}"</p>
      )}
    </div>
  )
}