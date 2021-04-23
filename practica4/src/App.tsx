import React from "react";
import "./App.css";

import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <div className="AppTitle">Buscador de libros de Openlibrary</div>
      <div>
        <Search />
      </div>
    </div>
  );
}

export default App;
