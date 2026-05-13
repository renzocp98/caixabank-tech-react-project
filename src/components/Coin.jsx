import { useStore } from "@nanostores/react";
import { $coinsData, $coinsLoading, $coinsPage } from "../stores/coinsStore";
import CoinCarousel from "./CoinCarousel";

export default function Coins() {
  const coins = useStore($coinsData)
  const loading = useStore($coinsLoading)
  const page = useStore($coinsPage)

  if (loading) return <div>Loading Data....</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <h1 className="text-center text-2xl font-bold py-6 text-green-400">Cryptocurrency Market</h1>
      <div className="w-full">
        <CoinCarousel coins={coins} />
      </div>
      <div className="flex justify-center py-6">
        <button className="p-4 hover:text-blue-300" disabled={page === 1} onClick={() => $coinsPage.set(page - 1)}>
          Anterior
        </button>
        <h2 className="p-4">{page}</h2>
        <button className="p-4 hover:text-blue-300" onClick={() => $coinsPage.set(page + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  )
}
