import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation 
} from "react-router-dom";
import './App.css';
import React, { useEffect } from 'react';
import { clusterApiUrl } from '@solana/web3.js';
import { getPhantomWallet, getSolletWallet, getSlopeWallet, getLedgerWallet } from '@solana/wallet-adapter-wallets';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import AnimatedHeader from './components/AnimatedHeader'
import BuyIt from "./views/Home/buyIt";


const wallets = [getPhantomWallet(), getSlopeWallet(), getSolletWallet(), getLedgerWallet()]
const network = clusterApiUrl("mainnet-beta");

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
          <Route path="/buy" exact>
            <AnimatedHeader />
            <ScrollToTop />              
            <BuyIt />
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