import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const HomePage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div id="main">
      <div className="hero-section">
        <div className="hero-content">
          <p className="hero-heading h2 white-0">Note makingg become easy</p>
          <p className="hero-subheading h6 regular white-0">
            Create and organise notes in an easy and intuitive way
          </p>
          <Link
            to={isAuthenticated() ? "/notes" : "/auth"}
            className="btn btn-primary btn-lg"
          >
            Get Started
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
