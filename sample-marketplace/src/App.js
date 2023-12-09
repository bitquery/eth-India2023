import logo from './logo.svg';
import './App.css';
import MyComponent from "./components/dashboard"
import StorageInfo from "./bitquery/filfox"

function App() {
  return (
    <div className="App">
      <MyComponent/>
      <StorageInfo/>
    </div>
  );
}

export default App;
