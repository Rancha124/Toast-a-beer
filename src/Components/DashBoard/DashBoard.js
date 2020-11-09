import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { connect } from "react-redux";
import axios from "axios";
import SingleBeerItem from "../SingleBeerItem/SingleBeerItem";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { SettingsInputHdmiRounded } from "@material-ui/icons";

function DashBoard(props) {
  const [query, setQuery] = useState("");
  const [filterby, setFilterby] = useState("");
  let search = "";
  let filterProp = "";
  let filterdata = [];
  const [grid, setGrid] = useState(true);
  useEffect(() => {
    axios
      .get(`https://api.punkapi.com/v2/beers?beer_name=${query}`)
      .then((res) => {
        props.newBeerData(res.data);
      })
      .catch((error) => {
        console.log("something went wrong in the api call");
      });
  }, [query]);
  useEffect(() => {
    axios
      .get(`https://api.punkapi.com/v2/beers/random`)
      .then((res) => {
        props.updateBeerData(res.data);
      })
      .catch((error) => {
        console.log("something went wrong in the api call");
      });
  }, []);
  const beers = props.beersData?.map((item) => {
    return (
      <SingleBeerItem
        item={item}
        key={item.title + Math.random() + Math.random()}
        grid={grid}
      />
    );
  });
  const compare = (a, b) => {
    if (a.likes < b.likes) {
      return 1;
    }
    if (a.likes > b.likes) {
      return -1;
    }
    return 0;
  };
  const filterByinput = () => {
    filterdata = [];
    props.beersData?.map((item) => {
      item.ingredients.malt.map((subitem) => {
        if (
          subitem.name ==
          filterby.charAt(0).toUpperCase() + filterby.slice(1)
        ) {
          filterdata.push(item);
        }
      });
      item.food_pairing.map((foodItem) => {
        if (foodItem == filterby) {
          filterdata.push(item);
        }
      });
    });
    props.newBeerData(filterdata);
  };
  return (
    <>
      <Navbar />
      <div
        style={{ marginTop: "60px" }}
        className=" d-flex justify-content-around"
      >
        <div className="dashboard-input">
          <input
            type="text"
            placeholder="Search for beers info"
            onChange={(e) => {
              search = e.target.value;
            }}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                setQuery(search);
              }
            }}
          />
          <button
            onClick={() => {
              let dummy = props.beersData?.sort(compare);
              props.newBeerData(dummy);
            }}
          >
            Sort by Likes
          </button>
        </div>
        <div className="dashboard-input">
          <input
            type="text"
            placeholder="Filter by malt ingredient or food pairing"
            onChange={(e) => {
              e.preventDefault();
              //filterProp = e.target.value;
              setFilterby(e.target.value);
            }}
            // onKeyUp={(e) => {
            //   if (e.keyCode === 13) {
            //     filterByinput();
            //     setFilterby(filterProp);
            //   }
            // }}
          />
          <button
            disabled={filterby.length > 0 ? false : true}
            onClick={() => filterByinput()}
          >
            Filter
          </button>
        </div>
      </div>
      <button
        style={{ cursor: "pointer" }}
        onClick={() => setGrid((prev) => !prev)}
      >
        Grid/list
      </button>
      <div
        className={
          grid
            ? `images-grid-display text-center mt-5 pt-3`
            : "d-flex flex-column m-5 py-3 w-75 mx-auto mb-2"
        }
      >
        {beers}{" "}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    beersData: state.loadMoreReducer.beersData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateBeerData: (data) => {
      dispatch({ type: "UPDATE_BEER_DATA", value: data });
    },
    newBeerData: (data) => {
      dispatch({ type: "NEW_BEER_DATA", value: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
