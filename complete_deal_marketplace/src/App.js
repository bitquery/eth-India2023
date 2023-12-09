import { BrowserRouter, Route, Routes } from "react-router-dom"

import './App.css';

import Home from "./Home";
import AccountData from "./components/AccountData";

function App() {
	return (
		<BrowserRouter>
			<Routes className="App">
				<Route path="/" exact Component={Home} />
				<Route path="/address/:address" exact Component={AccountData} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
