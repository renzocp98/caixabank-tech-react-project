import { atom, effect } from "nanostores"
import { $apiKey, $rootURL } from "./appStore"

const loadDataHomePage = () =>
  Promise.all([
    fetch(`${$rootURL.get()}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&x_cg_demo_api_key=${$apiKey.get()}`).then(response => response.json()),
    fetch(`${$rootURL.get()}nfts/list?per_page=8&page=1&x_cg_demo_api_key=${$apiKey.get()}`).then(response => response.json()),
  ]);

export const $homeCoins = atom([]);
export const $homeNfts = atom([]);
export const $homeLoading = atom(true);

const $homeInit = atom(true);

effect([$homeInit], () => {
  loadDataHomePage().then(([coins, nfts]) => {
    $homeCoins.set(coins);
    $homeNfts.set(nfts);
    $homeLoading.set(false);
  });
});