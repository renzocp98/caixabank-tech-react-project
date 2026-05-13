import { useStore } from "@nanostores/react"
import { $homeCoins, $homeNfts, $homeLoading } from "./stores/homeStore"
import CoinTable from '#components/CoinTable.jsx'
import NftTable from '#components/NftTable.jsx'

export default function HomePage() {
  const coindata = useStore($homeCoins);
  const nftdata = useStore($homeNfts);
  const loading = useStore($homeLoading);

  if (loading) return <p>Cargando...</p>

  return (
    <>
      <header>
        <h1 className="text-center p-6">Coins and NFTs Dashboard</h1>
      </header>
      <section className="pl-10 flex justify-center gap-50 px-10 py-6">
        <CoinTable coindata={coindata} className="p-5" />
        <NftTable nftdata={nftdata} />
      </section>
    </>
  )
}
