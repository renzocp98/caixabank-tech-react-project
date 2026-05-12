import { AppContext } from "#main.jsx";
import { useContext, useEffect, useState } from "react";
import DerivativesCarousel from "./DerivativesCarousel";

export default function Derivatives() {
  const { apiKey, rootURL } = useContext(AppContext);
  const [exchanges, setExchanges] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const loadDerivativesData = async () => {
    const response = await fetch(
      `${rootURL}derivatives/exchanges?per_page=10&page=${page}&x_cg_demo_api_key=${apiKey}`
    );
    return await response.json();
  }

  useEffect(() => {
    setLoading(true);
    loadDerivativesData().then(data => {
      setExchanges(data);
      setLoading(false);
    });
  }, [page]);

  if (loading) return <div>Loading Data....</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <h1 className="text-center text-2xl font-bold py-6 text-cg-green">Derivatives Market</h1>
      <div className="w-full">
        <DerivativesCarousel exchanges={exchanges} />
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
  );
}
