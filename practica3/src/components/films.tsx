import { FC, useEffect, useState } from "react";
import "whatwg-fetch";
import "./components.css";

interface IResult {
  title: string;
}

const Films: FC = () => {
  const [data, setData] = useState<IResult[]>();
  const [item, setItem] = useState<IResult[]>();
  const [state, setState] = useState<string>("");

  useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
      });
  }, []);

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
            data.map((value) => {
              return <div className="result">{value.title}</div>;
            })}

          {state === "atoz" &&
            data
              .sort(function (a, b) {
                if (a.title > b.title) return 1;
                if (a.title < b.title) return -1;
                else return 0;
              })
              .map((value) => {
                return <div className="result">{value.title}</div>;
              })}

          {state === "ztoa" &&
            data
              .sort(function (a, b) {
                if (a.title < b.title) return 1;
                if (a.title > b.title) return -1;
                else return 0;
              })
              .map((value) => {
                return <div className="result">{value.title}</div>;
              })}

          {state === "search" && (
            <div>
              <input
                type="text"
                className="searchInput"
                onChange={(e) => {
                  const items = data.filter((data) => {
                    if (data.title.includes(e.target.value)) return data;
                  });
                  setItem(items);
                }}
              />
              {item &&
                item.map((value) => {
                  return <div className="result">{value.title}</div>;
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Films;
