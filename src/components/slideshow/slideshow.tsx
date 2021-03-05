import React, { FC, useState } from "react";
import { images } from "./slidedata";
import Details from "../details/details";
import "./slideshow.css";

const Slideshow: FC = () => {
  const [i, setIndex] = useState(0);
  const [img, setImg] = useState<string>("");

  return (
    <div className="web">
      <div className="detail_container">
        <Details url={img}></Details>
      </div>
      <div className="slideshow">
        <div
          className="images"
          style={{ transform: `translate3d(${-i * 100}%,0,0)` }}
        >
          {images.map((image, i) => {
            return (
              <div
                className="thumbnail"
                key={i}
                style={{ backgroundImage: image }}
                onClick={() => {
                  console.log(window.screen.height);
                  setImg(images[i]);
                }}
              ></div>
            );
          })}
        </div>
        <div className="dots">
          {images.map((_, index) => {
            return (
              <div
                key={index}
                className={`dot${i === index ? " active" : ""}`}
                onClick={() => {
                  setIndex(index);
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
