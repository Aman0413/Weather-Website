import Home from "./componets/home/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Home />
      <div>
        <p className="copyright">
          Copyright © {new Date().getFullYear()} All rights reserved |Made by
          Aman
        </p>
      </div>
    </div>
  );
}

export default App;
