// import logo from './logo.svg';
// import './App.css';
import Dashboard from './dashboard';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Welcome to <a href="https://www.github.com/yrom1/"><code>yrom1</code></a>'s site
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Dashboard />
    </div >
  );
}

export default App;
