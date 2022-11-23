import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import Navbar from "./components/Navbar";

import Homepage from "./pages/Homepage";
import Exchanges from "./pages/Exchanges";
import Cryptocurrencies from "./pages/Cryptocurrencies";
import CryptoDetails from "./pages/CryptoDetails";
import News from "./pages/News";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route path="/exchanges">
                <Exchanges />
              </Route>
              <Route path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Cryptoverse <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
