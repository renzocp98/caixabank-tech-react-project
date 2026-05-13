import { useStore } from "@nanostores/react";
import { $derivativesData, $derivativesLoading, $derivativesPage } from "../stores/derivativesStore";
import DerivativesCarousel from "./DerivativesCarousel";

export default function Derivatives() {
  const exchanges = useStore($derivativesData);
  const loading = useStore($derivativesLoading);
  const page = useStore($derivativesPage);

  if (loading) return <div>Loading Data....</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <h1 className="text-center text-2xl font-bold py-6 text-cg-green">Derivatives Market</h1>
      <div className="w-full">
        <DerivativesCarousel exchanges={exchanges}/>
      </div>
      <div className="flex justify-center py-6">
        <button className="p-4 hover:text-blue-300" disabled={page === 1} onClick={() => $derivativesPage.set(page - 1)}>
          Anterior
        </button>
        <h2 className="p-4">{page}</h2>
        <button className="p-4 hover:text-blue-300" onClick={() => $derivativesPage.set(page + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  )
}
