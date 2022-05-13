import React from "react";
import { Link } from "react-router-dom";
// import { RoundImageCard } from "../components/RoundImageCard";
// import { useApi } from "../contexts/ApiContext";
// import { useData } from "../contexts/DataContext";

export const HomePage = () => {
  //   const { usegetAllCategories } = useApi();
  //   const { state: globalState } = useData();
  //   const { loading: isLoadingAllCategories } = usegetAllCategories();
  return (
    <div id="main">
      <div className="hero-section">
        <div className="hero-content">
          <p className="hero-heading h2 white-0">Watch amazing videos</p>
          <p className="hero-subheading h6 regular white-0">
            We bring the most authentic and trending videos to give you full
            entertainment and information
          </p>
          <Link to="/videos" className="btn btn-primary btn-lg">
            WATCH NOW
          </Link>
        </div>
      </div>
      {/* <!-- offer-section --> */}
      <div className="offer-section">
        <h2 className="h2 tx-center m-20 p-20 black-6">Features</h2>
        <div className="offer-container">
          {/* {[1,2,3].map((item, idx) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                key={item._id}
                to="/videos"
                state={{ categoryIndex: idx }}
              >
                <RoundImageCard
                  key={item.categoryName}
                  imageUrl={item.imageUrl}
                  title={item.categoryName}
                  onClick={() => console.log("Clicked")}
                />
              </Link>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};
