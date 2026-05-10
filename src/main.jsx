import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '#HomePage.jsx'
import Coins from '#components/Coin.jsx'
import NFTs from '#components/NFTs.jsx'
import Exchanges from '#components/Exchanges.jsx'
import Derivatives from '#components/Derivatives.jsx'
import Layout from '#Layout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='coins' element={<Coins/>}/>
          <Route path='nfts' element={<NFTs/>}/>
          <Route path='exchanges' element={<Exchanges/>}/>
          <Route path='derivatives' element={<Derivatives/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
