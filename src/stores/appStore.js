import { atom } from "nanostores"

export const $apiKey = atom(import.meta.env.VITE_COINGECKO_API_KEY)
export const $rootURL = atom("https://api.coingecko.com/api/v3/")
