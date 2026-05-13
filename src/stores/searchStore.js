import { atom, effect } from "nanostores";
import { $apiKey, $rootURL } from "./appStore";

export const $search = atom("");
export const $debouncedSearch = atom("");
export const $searchResults = atom(null);

effect([$search], (search) => {

  const timeout = setTimeout(() => {
    $debouncedSearch.set(search);
  }, 500);

  return () => clearTimeout(timeout)
});

const loadDataSearch = async (search) =>{
  
  const response = await  fetch(`${$rootURL.get()}search?query=${search}&x_cg_demo_api_key=${$apiKey.get()}`)
  return await response.json();
}

effect([$debouncedSearch], (dSearch) => {

  if (!dSearch) {
    $searchResults.set(null);
    return;
  }

  loadDataSearch(dSearch).then(data => $searchResults.set(data));
});

