import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '#HomePage.jsx';
import Coins from '#components/Coin.jsx';
import NFTs from '#components/NFTs.jsx';
import Derivatives from '#components/Derivatives.jsx';
import Layout from '#Layout.jsx';
import CoinsDetails from '#components/CoinsDetails.jsx';
import NFTsDetails from '#components/NFTsDetails.jsx';
import DerivativesDetails from '#components/DerivativesDetails.jsx';
import SearchResults from '#components/SearchResults.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/caixabank-tech-react-project/">
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='coins'>
            <Route index element={<Coins/>}/>
            <Route path=':id' element={<CoinsDetails/>}/>
          </Route>
          <Route path='nfts'>
            <Route index element={<NFTs/>}/>
            <Route path=':id' element={<NFTsDetails/>}/>
          </Route>
          <Route path='derivatives'>
            <Route index element={<Derivatives/>}/>
            <Route path=':id' element={<DerivativesDetails/>}/>
          </Route>
          <Route path='search' element={<SearchResults/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
