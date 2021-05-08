import React from "react";
import { FC, useState } from "react";
import "./Search.css";

interface ISearchProps {
  searchBy: Function;
}

const Search: FC<ISearchProps> = ({ searchBy }) => {
  const [searchName, setSearchName] = useState<string>();
  const [searchType, setSearchType] = useState<boolean>(true);

  return (
    <div className="search-view">

      <div>
        <input
          type="search"
          placeholder="Nombre a buscar..."
          className="searchInput"
          onChange={(e) => {
            setSearchName(e.target.value);
          }} />
        <button
          className="searchBox"
          onClick={(e) => {
            searchBy(searchName, searchType);
          }} >
          Buscar
        </button>
      </div>

      <div>
        <input
          type="radio"
          id="grid"
          name="view"
          className="viewType"
          defaultChecked
          onClick={(e) => { setSearchType(true); }} />
        <label htmlFor="grid" className="viewLabel">Búsqueda por país</label>
        <input
          type="radio"
          id="list"
          name="view"
          className="viewType"
          onClick={(e) => { setSearchType(false); }} />
        <label htmlFor="list" className="viewLabel">Búsqueda por ciudad</label>
      </div>

    </div>
  );
};

export default Search;
