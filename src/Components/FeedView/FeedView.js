import React, { useState, useEffect } from "react";
import "./feedview.css";
import { connect } from "react-redux";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import "./feedview.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
function FeedView(props) {
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variaable to clear it
      axios
        .get(`https://api.punkapi.com/v2/beers/random`)
        .then((res) => {
          let dummy = res.data[0];
          dummy.likes = 0;
          props.updateBeerData([dummy]);
          setData(res.data);
        })
        .catch((error) => {
          console.log("something went wrong in the api call");
        });
    }, 5000);

    return () => clearInterval(intervalId); //This is important
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "60px" }}>
        {props.beersData.length ? (
          props.beersData?.map((result, index) => {
            return (
              <div className="feedview" key={result.name + result.tagline}>
                <p className="name">{result.name}</p>
                <img
                  src={result.image_url}
                  height="250"
                  width="70"
                  alt="no image"
                  alt="random beer img"
                />
                <p className="tagline">{result.tagline}</p>
                <p className="description">{result.description}</p>

                <div className=" d-flex justify-content-around px-2 post-options">
                  <div>
                    <div className="d-flex align-items-center post-option px-2 pt-2">
                      {result.likes > 0 ? (
                        <ThumbUpAltIcon
                          style={{ color: "green", cursor: "pointer" }}
                          onClick={() => {
                            result.likes = result.likes + 1;
                            setLikes(result.likes);
                          }}
                        />
                      ) : (
                        <ThumbUpAltOutlinedIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            result.likes = 1;
                            setLikes(result.likes);
                          }}
                        />
                      )}

                      <p className="pl-2 m-0">Like</p>
                    </div>
                    {result.likes && (
                      <p
                        className="m-0 pt-0"
                        style={{
                          fontSize: "13px",
                          marginBottom: "3px",
                          textAlign: "left",
                          paddingLeft: "15px",
                        }}
                      >
                        {" "}
                        {result.likes}
                      </p>
                    )}
                  </div>
                  <div
                    className="d-flex align-items-center post-option p-2"
                    style={{ cursor: "pointer" }}
                    // onClick={() =>
                    //   document.getElementById(`inputSearch`).focus()
                    // }
                  >
                    <ChatBubbleOutlineIcon />
                    <p className="px-2 mt-2">Comment</p>
                  </div>
                </div>
                <div className="input-search pb-2">
                  <input
                    type="text"
                    id="inputSearch"
                    placeholder="    Enter a Comment"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    onKeyUp={(event) => {
                      if (event.keyCode === 13) {
                        result.comment = comment;
                        setComment("");
                        //props.updateBeerData(data);
                      }
                    }}
                  />
                </div>
                {result.comment && (
                  <div className="comment">
                    <p> {result.comment} </p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <LoadingScreen />
        )}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedView);
