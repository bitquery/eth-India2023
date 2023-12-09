import './App.css';

import MyComponent from "./components/dashboard"
import StorageInfo from "./bitquery/filfox"

import { ContextProvider } from "./state/Context";

function App() {
	return (
		<ContextProvider>
			<div className="App">
				<MyComponent />
				<StorageInfo />
			</div>
		</ContextProvider>
	);
}

export default App;
