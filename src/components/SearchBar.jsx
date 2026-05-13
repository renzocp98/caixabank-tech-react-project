import { useStore } from "@nanostores/react";
import { useNavigate } from "react-router-dom";
import { $search} from "../stores/searchStore";

export default function SearchBar() {

  const search = useStore($search);
  const navigate = useNavigate();

  const handleChange = (e) => {
    $search.set(e.target.value);
    if (e.target.value) navigate("/search");
  }

  return (
    
    <input
      type="text"
      placeholder="Buscar coins, NFTs..."
      value={search}
      onChange={handleChange}
      className="bg-cg-card-green text-white text-sm px-4 py-2 rounded-xl border border-cg-green/20 focus:outline-none focus:border-cg-green placeholder-gray-500 w-64"
    />
  )
}