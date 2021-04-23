import React, { FC } from "react";
import "./Books.css";

interface IBook {
  title: string;
  cover_i: string;
  id_amazon?: string[];
  author_name: string[];
  first_publish_year: number;
}

const Books: FC<{ book: IBook; view: string }> = ({ book, view }) => {
  if (view === "grid") {
    return (
      <div className="resultsGrid">
        {book.cover_i && (
          <img className="cover" alt="img_cover"
            src={"http://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg"}></img>)}
        {!book.cover_i && <div>-No cover-</div>}
        <h2>{book.title}</h2>
        <h4>Autor: {book.author_name?.[0]}</h4>
        <h5>Primera publicación: {book.first_publish_year}</h5>
        {book.id_amazon && (
          <button
            className="amazon"
            onClick={(e) => { window.open("https://www.amazon.es/dp/" + book.id_amazon?.[0]); }}
          ></button>)}
      </div>
    );
  } else return (
      <div className="resultsList">
        <h2>{book.title}</h2>
        <h4>Autor: {book.author_name?.[0]}</h4>
        <h5>Primera publicación: {book.first_publish_year}</h5>
        {book.id_amazon && (
          <button
            className="amazon"
            onClick={(e) => { window.open("https://www.amazon.es/dp/" + book.id_amazon?.[0]); }}
          ></button>)}
      </div>
    );
};

export default Books;