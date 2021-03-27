import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import React, { useState } from "react";
import "./App.css";
import Characters from "./components/characters";
import Films from "./components/films";
import Planets from "./components/planets";

const restLink = new RestLink({
  uri: "https://swapi.dev/api/",
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

function App() {
  const [state, setState] = useState<string>("null");
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="titleImg"></div>
        <div className="endpoints">
          <button onClick={() => setState("fil")}>Peliculas</button>
          <button onClick={() => setState("cha")}>Personajes</button>
          <button onClick={() => setState("pla")}>Planetas</button>
        </div>
        {state === "fil" && <Films />}
        {state === "cha" && <Characters />}
        {state === "pla" && <Planets />}
      </div>
    </ApolloProvider>
  );
}

export default App;
