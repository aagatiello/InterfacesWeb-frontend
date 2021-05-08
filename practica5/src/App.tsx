import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import "./App.css";

import Search from "./components/Search";
import Cities from "./components/Cities";
import Countries from "./components/Countries";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
});

function App() {
  const [searchName, setSearchName] = useState<string>("");
  const [searchType, setSearchType] = useState<boolean>(false);
  const searchData = (name: string, type: boolean) => {
    setSearchName(name);
    setSearchType(type);
  };

  return (
    <ApolloProvider client={client}>
      <div className="header">
        <div className="AppTitle"> Buscador de paises y ciudades de Everbase </div>
        <Search searchBy={searchData} />
      </div>
      <div>
        {searchType && <Countries name={searchName} searchBy={searchData} />}
        {!searchType && <Cities name={searchName} searchBy={searchData} />}
      </div>
    </ApolloProvider>
  );
}

export default App;
