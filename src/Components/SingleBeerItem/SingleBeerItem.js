import React from "react";
import { Link } from "react-router-dom";
import "./singlebeeritem.css";

function SingleBeerItem({ item, grid }) {
  return item.image_url ? (
    <div
      className={
        grid
          ? "d-flex flex-column justify-content-center align-items-center"
          : "d-flex mx-5 my-3"
      }
    >
      <div className="single-image-element">
        <Link to={`beer/${item.id}`}>
          <img
            src={item.image_url}
            alt="image not loaded"
            height="239px"
            width="70px"
          />
        </Link>
      </div>
      <Link to={`beer/${item.id}`}>
        <div className={grid ? "p-tag px-1 mt-1" : "list"}>
          <span
            style={{
              verticalAlign: "center",
              paddingTop: "2px",
              paddingBottom: "2px",
              fontSize: grid ? "" : "20px",
            }}
            className="full-text"
          >
            {item.name} ({item.likes || 0})
          </span>
          {!grid && (
            <div className="pl-5 mt-3 h-75">
              <p className="mt-3" style={{ fontSize: "18px" }}>
                {item.tagline}
              </p>
              <p className="mt-3">{item.description} </p>
            </div>
          )}
        </div>
      </Link>
    </div>
  ) : null;
}
export default SingleBeerItem;
