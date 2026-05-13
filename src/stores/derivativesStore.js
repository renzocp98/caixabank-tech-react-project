import { atom, effect } from "nanostores";
import { $apiKey, $rootURL } from "./appStore";


const loadDataDerivatives = (page) =>
  fetch(`${$rootURL.get()}derivatives/exchanges?per_page=10&page=${page}&x_cg_demo_api_key=${$apiKey.get()}`)
    .then(response => response.json());

export const $derivativesPage = atom(1);
export const $derivativesData = atom([]);
export const $derivativesLoading = atom(true);

effect([$derivativesPage], (page) => {
  $derivativesLoading.set(true);
  loadDataDerivatives(page).then(data => {
    $derivativesData.set(data);
    $derivativesLoading.set(false);
  });
});


const loadDataDerivativeDetail = (id) =>
  fetch(`${$rootURL.get()}derivatives/exchanges/${id}?include_tickers=unexpired&x_cg_demo_api_key=${$apiKey.get()}`)
    .then(response => response.json());

export const $derivativeId = atom(null);
export const $derivativeDetail = atom(null);
export const $derivativeDetailLoading = atom(true);

effect([$derivativeId], (id) => {
  if (!id) return;
  $derivativeDetailLoading.set(true);
  loadDataDerivativeDetail(id).then(data => {
    $derivativeDetail.set(data);
    $derivativeDetailLoading.set(false);
  });
});