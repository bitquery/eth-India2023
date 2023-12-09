import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Home from "./Home";
import AccountData from "./components/AccountData";
import getDealData from "./components/stats";
import React, { useEffect, useState } from 'react';
function App() {
  const [dealCount, setDealCount] = useState(0);
  useEffect(() => {
    const fetchDealCount = async () => {
      try {
        const response = await getDealData();
        console.log(response);
        setDealCount(response); // Adjust the property access accordingly
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDealCount();
  }, []);


  return (
    <div>
      <h1>Filecoin Deal Marketplace</h1>
      <p className="dashboard-metric"> Total Deals Published This Week: {dealCount}</p>
      <BrowserRouter>
        <Routes className="App">
          <Route path="/" exact Component={Home} />
          <Route path="/address/:address" exact Component={AccountData} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
