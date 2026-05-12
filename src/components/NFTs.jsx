import { AppContext } from "#main.jsx";
import { useContext, useEffect, useState } from "react";
import NFTsCarousel from "./NTFsCarousel";

export default function NFTs(){

  const { apiKey, rootURL } = useContext(AppContext);
  const [nfts, setNfts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadNFTsData = async () => {
    const listRes = await fetch(
      `${rootURL}nfts/list?per_page=8&page=${page}&x_cg_demo_api_key=${apiKey}`
    );
    const list = await listRes.json();

    const details = await Promise.all(
      list.map(({ id }) =>
        fetch(`${rootURL}nfts/${id}?x_cg_demo_api_key=${apiKey}`)
          .then(r => r.json())
          .catch(() => null)
      )
    );

    return details.filter(Boolean);
  }

  useEffect(() => {
    setLoading(true)
    loadNFTsData().then(data => {
      setNfts(data)
      setLoading(false)
    })
  }, [page])

  if(loading) return <div>Loading Data....</div>

    return(
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <h1 className="text-center text-2xl font-bold py-6 text-cg-green">NFT Market</h1>
            <div className="w-full">
                <NFTsCarousel nfts={nfts}/>
            </div>
            <div className="flex justify-center py-6">
                <button className="p-4 hover:text-blue-300" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                  Anterior
                </button>
                <h2 className="p-4">{page}</h2>
                <button className="p-4 hover:text-blue-300" onClick={() => setPage(p => p + 1)}>
                  Siguiente
                </button>
            </div>
    </div>
    )
}