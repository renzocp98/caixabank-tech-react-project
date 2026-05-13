import { atom, effect } from "nanostores"
import { $apiKey, $rootURL } from "./appStore"

const loadDataCoins = (page) => fetch(
  `${$rootURL.get()}coins/markets?vs_currency=usd&per_page=15&page=${page}&x_cg_demo_api_key=${$apiKey.get()}`)
  .then(response => response.json());

export const $coinsPage = atom(1);
export const $coinsData = atom([]);
export const $coinsLoading = atom(true);

effect([$coinsPage], (page) => {

  $coinsLoading.set(true);
  loadDataCoins(page).then(data => {

    $coinsData.set(data);
    $coinsLoading.set(false);
  })
})

const loadDataCoinDetail = (id) =>
  fetch(`${$rootURL.get()}coins/${id}?x_cg_demo_api_key=${$apiKey.get()}`)
  .then(response => response.json());

export const $coinId = atom(null);
export const $coinDetail = atom(null);
export const $coinDetailLoading = atom(true);

effect([$coinId], (id) => {

  if (!id) return;
  
  $coinDetailLoading.set(true);
  loadDataCoinDetail(id).then(data => {

    $coinDetail.set(data);
    $coinDetailLoading.set(false);
  })
})