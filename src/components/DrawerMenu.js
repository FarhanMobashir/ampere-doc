import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { CustomedNavLink } from "./CustomNavlink";
const NavigationRoutes = [
  {
    title: "All Notes",
    route: "/notes",
    icon: "notes",
  },
  {
    title: "Archive",
    route: "/notes/archive",
    icon: "archive",
  },
  {
    title: "Trash",
    route: "/notes/trash",
    icon: "trash-alt",
  },
  {
    title: "Profile",
    route: "/user",
    icon: "user-circle",
  },
];

const publicRouteData = [
  {
    title: "Signin",
    route: "/auth",
    icon: "user-circle",
  },
];

export const DrawerMenu = ({ onClick, onCreate }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div
        onClick={onClick}
        style={{
          backgroundColor: "black",
          width: "100%",
          height: "100vh",
          position: "fixed",
          top: "0",
          opacity: "0.5",
        }}
      ></div>

      <ul
        class="no-bullet-list"
        style={{
          position: "fixed",
          left: "0",
          background: "white",
          height: "100vh",
          top: "0",
          WebkitTapHighlightColor: "transparent",
          zIndex: "999",
        }}
      >
        <h1 class="h4 list-title flex-between-container">
          Menu <i className="uil uil-times" onClick={onClick}></i>
        </h1>
        {isAuthenticated() &&
          NavigationRoutes.map((item) => {
            return (
              <CustomedNavLink
                key={item.title}
                to={item.route}
                onClick={onClick}
              >
                <li className="tx-18">
                  <i class={`uil uil-${item.icon} tx-24`}></i> {item.title}
                </li>
              </CustomedNavLink>
            );
          })}
        {isAuthenticated() && (
          <button className="btn btn-primary" onClick={onCreate}>
            Create Note +
          </button>
        )}
        {!isAuthenticated() &&
          publicRouteData.map((item) => {
            return (
              <CustomedNavLink
                key={item.title}
                to={item.route}
                onClick={onClick}
              >
                <li className="tx-18">
                  <i class={`uil uil-${item.icon} tx-24`}></i> {item.title}
                </li>
              </CustomedNavLink>
            );
          })}
      </ul>
    </>
  );
};
