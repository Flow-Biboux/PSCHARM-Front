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
import Mint from "./views/Mint";
import Topbar from "./components/layout/topbar";


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
        <Topbar></Topbar>
        <Switch>
          <Route path="/" exact>
            <ScrollToTop />
            <Feed />
          </Route>
          <Route path="/mint" exact>
            <ScrollToTop />
            <Mint />
          </Route>
          <Route path="/createMint" exact>
            <ScrollToTop />              
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>

  );  
}

export default App;