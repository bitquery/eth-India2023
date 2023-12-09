import { BrowserRouter, Route, Routes } from "react-router-dom"

import './App.css';

import Home from "./Home";
import AccountData from "./components/AccountData";

function App() {
	return (
		<div>
			<h1>Filecoin Deal Marketplace</h1>
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
