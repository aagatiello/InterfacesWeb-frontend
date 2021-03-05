import React, { FC } from "react";
import "./details.css";

interface IDisplayProps {
  url: string;
}

const Details: FC<IDisplayProps> = ({ url }) => {
  return (
    <div className="details">
      <div className="selected" style={{ backgroundImage: url }}></div>
    </div>
  );
};
export default Details;
