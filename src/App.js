import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation 
} from "react-router-dom";
import './App.css';
import React, { useEffect } from 'react';
import Home from "./views/Home";
import Feed from "./views/Feed";
import Mint from "./views/Mint";

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
          <Route path="/feed">
            <ScrollToTop />
            <Feed />
          </Route>
          <Route path="/mint">
            <ScrollToTop />
            <Mint />
          </Route>
          <Route path="/">
            <ScrollToTop />              
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );  
}

export default App;