import { atom, effect } from "nanostores"
import { $apiKey, $rootURL } from "./appStore"

const loadDataNfts = (page) =>
  fetch(`${$rootURL.get()}nfts/list?per_page=8&page=${page}&x_cg_demo_api_key=${$apiKey.get()}`)
    .then(response => response.json())
    .then(list =>
      Promise.all(
        list.map(({ id }) =>
          fetch(`${$rootURL.get()}nfts/${id}?x_cg_demo_api_key=${$apiKey.get()}`)
            .then(response => response.json())
            .catch(() => null)
        )
      ).then(details => details.filter(Boolean)));

export const $nftsPage = atom(1)
export const $nftsData = atom([])
export const $nftsLoading = atom(true)

effect([$nftsPage], (page) => {

  $nftsLoading.set(true);
  loadDataNfts(page).then(data => {
    $nftsData.set(data);
    $nftsLoading.set(false);
  });
});


const loadDataNftDetail = (id) =>
  fetch(`${$rootURL.get()}nfts/${id}?x_cg_demo_api_key=${$apiKey.get()}`)
    .then(response => response.json());

export const $nftId = atom(null);
export const $nftDetail = atom(null);
export const $nftDetailLoading = atom(true);

effect([$nftId], (id) => {

  if (!id) return;

  $nftDetailLoading.set(true);
  loadDataNftDetail(id).then(data => {
    $nftDetail.set(data);
    $nftDetailLoading.set(false);
  });
});