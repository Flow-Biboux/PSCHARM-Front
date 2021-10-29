import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation 
} from "react-router-dom";
import './App.css';
import React, { useEffect } from 'react';
import Home from "./views/Home/index";
import Feed from "./views/Feed/index";
import Topbar from "./components/layout/topbar";
import { clusterApiUrl } from '@solana/web3.js';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import SiteHome from './components/SiteHome'
import AnimatedHeader from './components/AnimatedHeader'
import HowToBuy from './components/HowToBuy'


const wallets = [getPhantomWallet()]
const network = clusterApiUrl('devnet');

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {

  return (

    <Router>
      <div className="App">        
        <Switch>
          <Route path="/feed" exact>
            <Topbar></Topbar>
            <ScrollToTop />
            <Feed />
          </Route>
          <Route path="/" exact>
            <ScrollToTop />
            <AnimatedHeader animated={true} />
            <SiteHome />
          </Route>
          <Route path="/how-to-buy" exact>
            <ScrollToTop />
            <AnimatedHeader />
            <HowToBuy />
          </Route>
          <Route path="/createMint" exact>
            <Topbar></Topbar>
            <ScrollToTop />              
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>

  );  
}

const AppWithProvider = () => (
  <ConnectionProvider endpoint={network}>
      <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
              <App />
          </WalletModalProvider>
      </WalletProvider>
  </ConnectionProvider>
)

export default AppWithProvider;