import React from "react";
import logo from "../assets/logo.svg";
import logoMobile from "../assets/logo-mobile.svg";
import { DrawerMenu } from "./DrawerMenu";
import { Link } from "react-router-dom";
import { UIActions, useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";
export const AppHeader = () => {
  const { dispatch: globalDispatch } = useData();
  const { isAuthenticated } = useAuth();
  const [showDrawer, setShowDrawer] = React.useState(false);

  return (
    <div
      className="navigation-container"
      style={{
        position: "sticky",
        top: "0",
        background: "white",
        boxShadow: "0px 0px 5px grey",
        zIndex: 999,
      }}
    >
      <div className="upper-container">
        <div className="logo-and-menu">
          {/* for mobile */}
          <i
            className="drawer-menu-icon uil uil-bars"
            onClick={() => setShowDrawer(!showDrawer)}
          ></i>
          {/* for web */}
          <i
            className="logo uil uil-bars tx-24"
            onClick={() => setShowDrawer(!showDrawer)}
          ></i>
          <Link to="/">
            <img
              alt=""
              className="h4 logo-short logo-size-mobile mv-10"
              src={logoMobile}
            />
          </Link>
          <Link to="/">
            <img alt="" className="h4 logo logo-size" src={logo} />
          </Link>
        </div>

        <div className="search-container-big">
          <i className="search-icon uil uil-search"></i>
          <input
            placeholder="Search not implemented"
            className="search-input-big"
            type="text"
          />
        </div>

        <div className="nav-icon-container">
          <Link to={isAuthenticated() ? "/user" : "/auth"}>
            <i className="badge-icon uil uil-user-circle"></i>
          </Link>
        </div>
      </div>
      <div className="search-container-small">
        <i className="search-icon uil uil-search"></i>
        <input
          placeholder="Search not implemented"
          className="search-input-small"
          type="text"
        />
      </div>
      {showDrawer && (
        <DrawerMenu
          onClick={() => setShowDrawer(!showDrawer)}
          onCreate={() => {
            globalDispatch({ type: UIActions.showModal, payload: true });
            setShowDrawer(!showDrawer);
          }}
        />
      )}
    </div>
  );
};
