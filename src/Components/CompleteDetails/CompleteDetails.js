import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./completedetails.css";
import Navbar from "../navbar/Navbar";
function CompleteDetails(props) {
  const [item, setItem] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.punkapi.com/v2/beers/${props.match.params.id}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((error) => {
        console.log("something went wrong in the api call");
      });
  }, []);
  return item.length ? (
    <>
      <Navbar />
      <div className="complete-details mt-5 pt-2">
        <div className="d-flex align-items-center justify-content-around">
          <div>
            <img
              src={item[0]?.image_url}
              height="250"
              width="70"
              alt="no image"
            />
          </div>
          <div>
            <p className="name">{item[0]?.name}</p>

            <p className="tagline">{item[0]?.tagline}</p>
            <p className="tagline">First Brewed {item[0]?.first_brewed}</p>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center">
          <div className="mx-5 my-2">
            <p className="inner-title">Description</p>
            <p className="inner-data mx-3 px-3">{item[0]?.description}</p>
          </div>
          <div className="mx-5 my-2">
            <p className="inner-title">Brewers Tips</p>
            <p className="inner-data">{item[0]?.brewers_tips}</p>
          </div>
          <div className="mx-5 my-2">
            <p className="inner-title">Food Pairing</p>
            {item[0]?.food_pairing.map((fpitem) => (
              <p className="inner-data">{fpitem}</p>
            ))}
          </div>
          <div className="pt-1 mt-1">
            <p className="inner-title">Ingredients</p>
            {Object.keys(item[0]?.ingredients).map((ingitem) => {
              return (
                <>
                  {Array.isArray(item[0]?.ingredients[ingitem]) && (
                    <>
                      <p className="ingredients">
                        {ingitem.charAt(0).toUpperCase() + ingitem.slice(1)}
                      </p>
                      {item[0]?.ingredients[ingitem].map((subinItem) => {
                        return (
                          <div>
                            <div className="inner-ing-data d-flex justify-content-between">
                              <p className="pr-3"> {subinItem.name} </p>
                              <p className="pl-3">
                                {subinItem.amount.value} {subinItem.amount.unit}{" "}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              );
            })}
            <div>
              <p className="ingredients">Yeast </p>
              <p className="pl-3" style={{ fontSize: "20px" }}>
                {item[0]?.ingredients["yeast"]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
export default CompleteDetails;
