import { useStore } from "@nanostores/react";
import { $nftsData, $nftsLoading, $nftsPage } from "../stores/nftsStore";
import NFTsCarousel from "./NTFsCarousel";

export default function NFTs() {
  const nfts = useStore($nftsData);
  const loading = useStore($nftsLoading);
  const page = useStore($nftsPage);

  if (loading) return <div>Loading Data....</div>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <h1 className="text-center text-2xl font-bold py-6 text-cg-green">NFT Market</h1>
      <div className="w-full">
        <NFTsCarousel nfts={nfts} />
      </div>
      <div className="flex justify-center py-6">
        <button className="p-4 hover:text-blue-300" disabled={page === 1} onClick={() => $nftsPage.set(page - 1)}>
          Anterior
        </button>
        <h2 className="p-4">{page}</h2>
        <button className="p-4 hover:text-blue-300" onClick={() => $nftsPage.set(page + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  )
}
