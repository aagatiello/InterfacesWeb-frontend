import { FC, useEffect, useState } from "react";
import "whatwg-fetch";
import "./components.css";

interface IResult {
  name: string;
}

const Characters: FC = () => {
  const [character] = useState<IResult[]>([]);
  const [data, setData] = useState<IResult[]>();
  const [item, setItem] = useState<IResult[]>();
  const [state, setState] = useState<string>("");
  const [url, setUrl] = useState<string>("https://swapi.dev/api/people/");

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.next != null) {
          setUrl(data.next);
          setData(data);
          character.push(...data.results);
        }
      });
  }, [data]);

  return (
    <div>
      {!data && "Cargando..."}

      {data && (
        <div className="buttons">
          <button className="opbutton" onClick={() => setState("api")}> Predeterminado </button>
          <button className="opbutton" onClick={() => setState("atoz")}> A-Z </button>
          <button className="opbutton" onClick={() => setState("ztoa")}> Z-A </button>
          <button className="opbutton" onClick={() => setState("search")}> Buscar </button>

          {state === "api" &&
            character.map((value) => {
              return <div className="result">{value.name}</div>;
            })}

          {state === "atoz" &&
            character
              .sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                else return 0;
              })
              .map((value) => {
                return <div className="result">{value.name}</div>;
              })}

          {state === "ztoa" &&
            character
              .sort(function (a, b) {
                if (a.name < b.name) return 1;
                if (a.name > b.name) return -1;
                else return 0;
              })
              .map((value) => {
                return <div className="result">{value.name}</div>;
              })}

          {state === "search" && (
            <div>
              <input
                type="text"
                className="searchInput"
                onChange={(e) => {
                  const items = character.filter((data) => {
                    if (data.name.includes(e.target.value)) return data;
                  });
                  setItem(items);
                }}
              />
              {item &&
                item.map((value) => {
                  return <div className="result">{value.name}</div>;
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Characters;
