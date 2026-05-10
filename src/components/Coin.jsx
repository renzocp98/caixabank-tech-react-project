import { AppContext } from "#main.jsx";
import { useContext, useEffect, useState } from "react";
import CoinCarousel from "./CoinCarousel";

export default function Coins(){

  const { apiKey, rootURL } = useContext(AppContext);
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const loadCoinCardData = async () => {
    const response = await fetch(
      `${rootURL}coins/markets?vs_currency=usd&per_page=15&page=${page}&x_cg_demo_api_key=${apiKey}`
    );
    return await response.json();  
  }

  useEffect(() => {
    setLoading(true) 
    loadCoinCardData().then(data => {
        setCoins(data)
        setLoading(false)  // dentro del .then(), cuando ya hay datos
    })
}, [page])

  if(loading === true){
   return <div>
            Loading Data....
          </div>

  }

  return(
    <>
    <CoinCarousel coins={coins}>
    </CoinCarousel >
    <div className="flex">
      <button className="p-4 hover:text-blue-300" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
        Anterior
      </button>
      <h2 className="p-4">
        {page}
      </h2>
      <button className="p-4 hover:text-blue-300" onClick={() => setPage(p => p + 1)}>
        Siguiente
      </button>
    </div>

    </>

  )
}