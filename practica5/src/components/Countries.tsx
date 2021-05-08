import React, { useState, FC } from "react";
import RotateLoader from "react-spinners/RotateLoader";
import { gql, useQuery } from "@apollo/client";
import "./CitiesCountries.css";

const COUNTRIES = gql`
  query getCountry($name: String!) {
    countries(where: { name: { eq: $name } }) {
      name
      continent {
        name
      }
      capital {
        name
      }
      languages {
        name
      }
      currencies {
        name
      }
      population
    }
  }
`;

interface ICountry {
  countries: Array<{
    name: string;
    continent: {
      name: string;
    };
    capital: {
      name: string;
    };
    languages: Array<{
      name: string;
    }>;
    currencies: Array<{
      name: string;
    }>;
    population: number;
  }>;
}

interface ICountryProps {
  name: string;
  searchBy: Function;
}

const Countries: FC<ICountryProps> = ({ name, searchBy }) => {
  const { data, loading, error } = useQuery<ICountry>(COUNTRIES, {
    variables: { name: name },
  });
  const [i, setI] = useState<number>();

  return (
    <div className="countries">
      {loading && (
        <div className="loader"><RotateLoader color="#21A453" /></div>
      )}
      {error && <div className="resultError"> {error.message} </div>}
      {data &&
        data.countries.map((country, index) => {
          if (i === index) {
            return (
              <div className="index_place">
                <div className="placeInfo">
                  <div>País: {country.name}</div>
                  <div>Continente: {country.continent.name}</div>
                  <div
                    onClick={() => {
                      searchBy(country.capital.name, false);
                    }} >
                    Capital: <b>{country.capital.name}</b>
                  </div>
                  <div>Idiomas oficiales: </div>
                  {country.languages &&
                    country.languages.map((language) => {
                      return <li>{language.name}</li>;
                    })}
                  <div>Monedas oficiales: </div>
                  {country.currencies &&
                    country.currencies.map((currencie) => {
                      return <li>{currencie.name}</li>;
                    })}
                  <div>Población: {country.population}</div>
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
                  {country.name}
                </div>
              </div>
            );
          }
        )
      }
    </div>
  );
};

export default Countries;
