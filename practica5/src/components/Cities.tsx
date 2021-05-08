import React, { FC, useState } from "react";
import RotateLoader from "react-spinners/RotateLoader";
import { gql, useQuery } from "@apollo/client";
import "./CitiesCountries.css";

const CITIES = gql`
  query getCity($name: String!) {
    cities(where: { name: { eq: $name } }) {
      name
      country {
        name
      }
      population
      timeZone {
        name
      }
    }
  }
`;

interface ICity {
  cities: Array<{
    name: string;
    country: {
      name: string;
    };
    population: number;
    timeZone: {
      name: string;
    };
  }>;
}

interface ICityProps {
  name: string;
  searchBy: Function;
}

const Cities: FC<ICityProps> = ({ name, searchBy }) => {
  const { data, loading, error } = useQuery<ICity>(CITIES, {
    variables: { name: name },
  });
  const [i, setI] = useState<number>();

  return (
    <div className="cities">
      {loading && (
        <div className="loader"><RotateLoader color="#21A453" /></div>
      )}
      {error && <div className="resultError"> {error.message} </div>}
      {data &&
        data.cities.map((city, index) => {
          if (i === index) {
            return (
              <div className="index_place">
                <div className="placeInfo">
                  <div>Ciudad: {city.name}</div>
                  <div
                    onClick={() => {
                      searchBy(city.country.name, true);
                    }} >
                    País: <b>{city.country.name}</b>
                  </div>
                  <div>Población: {city.population}</div>
                  {city.timeZone && (
                    <div>Franja horaria: {city.timeZone.name} </div>
                  )}
                </div>
              </div>
            );
          } else return (
            <div className="place">
              <div
                className="placeName"
                onClick={() => {
                  setI(index);
                }} >
                {city.name}
              </div>
            </div>
            );
        })
      }
    </div>
  );
};

export default Cities;
