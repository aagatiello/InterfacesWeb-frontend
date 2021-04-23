import React, { FC, useState } from "react";
import axios from "axios";
import "./Search.css";
import Books from "./Books";
import { GridLoader } from "react-spinners";

interface IBook {
  title: string;
  cover_i: string;
  id_amazon?: string[];
  author_name: string[];
  first_publish_year: number;
}

interface IResult {
  numFound: number;
  start: number;
  docs: IBook[];
}

const Search: FC = () => {
  const [valueTitle, setValueTitle] = useState<string>("");
  const [valueAuthor, setValueAuthor] = useState<string>("");
  const [data, setData] = useState<IResult | undefined>(undefined);
  const [searching, setSearching] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(true);
  const [mypage, setMyPage] = useState<number>(0);
  const [apipage, setApiPage] = useState<number>(1);
  const [view, setView] = useState<string>("list");

  let uri: string = "";
  const search = (searchText: string) => {
    setData(undefined);
    setSearching(true);
    setResult(true);

    if (valueTitle === "")
      uri = `${process.env.REACT_APP_API_URL_SEARCH}?author=${searchText}&page=${apipage}`;

    if (valueAuthor === "")
      uri = `${process.env.REACT_APP_API_URL_SEARCH}?title=${searchText}&page=${apipage}`;

    axios
      .get<IResult>(encodeURI(uri))
      .then((response) => {
        if (response.data.numFound === 0) setResult(false);
        else setData(response.data);
        setSearching(false);
      })
      .catch((error) => {
        if (error.response.status >= 400) {
          setSearching(false);
          setResult(false);
        }});
  };

  return (
    <div>

      <div className="search-view">
        <div>
          <input
            type="search"
            className="searchBox"
            value={valueTitle}
            placeholder="Busqueda por titulo..."
            onChange={(e) => {
              if (valueTitle) setValueAuthor("");
              setValueTitle(e.target.value);}}/>
          <input
            type="search"
            className="searchBox"
            value={valueAuthor}
            placeholder="Busqueda por autor..."
            onChange={(e) => {
              if (valueAuthor) setValueTitle("");
              setValueAuthor(e.target.value);}}/>
          <button
            className="searchBox"
            onClick={(e) => {
              if (valueTitle === "") search(valueAuthor);
              if (valueAuthor === "") search(valueTitle);
            }}> Buscar </button>
        </div>

        <div>
          <input
            type="radio"
            id="grid"
            name="view"
            className="viewType"
            onClick={(e) => { setView("grid"); }}/>
          <label htmlFor="grid">Vista de cuadrícula</label>
          <input
            type="radio"
            id="list"
            name="view"
            className="viewType"
            defaultChecked
            onClick={(e) => { setView("list"); }}/>
          <label htmlFor="list">Vista de lista</label>
        </div>

      </div>

      {data && view !== "grid" && (
        <div className="sortButtons">
          <button className="opbutton" onClick={() => setView("atoz")}> Título A - Z </button>
          <button className="opbutton" onClick={() => setView("year")}> Año 1 - 9 </button>
        </div>
      )}

      {searching && (
        <div className="loader"><GridLoader color="#17496e" /></div>
      )}

      {!result && (
        <div className="resultError"> Tu búsqueda no obtuvo ningún resultado </div>
      )}

      {data && view === "grid" && 
        data.docs
          .slice((mypage % 5) * 20, (mypage % 5) * 20 + 20)
          .map((book: IBook) => {
            return (
              <div className="gridFlex"><Books book={book} view={"grid"} /></div>
            );
          })}

      {data && view === "list" &&
        data.docs
          .slice((mypage % 5) * 20, (mypage % 5) * 20 + 20)
          .map((book: IBook) => { return <Books book={book} view={""} />; })}

      {view === "atoz" &&
        data!.docs
          .sort((a, b) => {
            if (a.author_name < b.author_name) return 1;
            if (a.author_name > b.author_name) return -1;
            else return 0;
          })
          .slice((mypage % 5) * 20, (mypage % 5) * 20 + 20)
          .map((book: IBook) => { return <Books book={book} view={""} />; })}

      {view === "year" &&
        data!.docs
          .sort((a, b) => {
            if (a.first_publish_year > b.first_publish_year) return 1;
            if (a.first_publish_year < b.first_publish_year) return -1;
            else return 0;
          })
          .slice((mypage % 5) * 20, (mypage % 5) * 20 + 20)
          .map((book: IBook) => { return <Books book={book} view={""} />; })}

      <div className="prev-next">
        {!searching && mypage > 0 && (
          <button
            className="pagenum"
            onClick={(e) => {
              setMyPage(mypage - 1);
              window.scrollTo(0, 0);
              if (mypage * 20 < data?.start!) {
                setApiPage(apipage - 1);
                search(valueTitle);
              }}}> « Anterior </button>)}
        {!searching && mypage < data?.numFound! / 20 && (
          <button
            className="pagenum"
            onClick={(e) => {
              setMyPage(mypage + 1);
              window.scrollTo(0, 0);
              if (mypage * 20 + 20 * apipage >= data?.start! + 100) {
                setApiPage(apipage + 1);
                search(valueTitle);
              }}}> Siguiente » </button>)}
      </div>
    </div>
  );
};

export default Search;