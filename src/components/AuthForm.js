import { Checkbox } from "./Checkbox";
import { Input } from "./Input";
import React from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useToggle } from "../hooks/useToggle";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const onLogin = useToggle(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const guestLoginCredential = {
    email: "d@d.com",
    password: "1234",
  };

  function signupValidation(password, confirmPassword) {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

  function signUp(e) {
    e.preventDefault();
    setLoading(true);
    if (signupValidation(password, confirmPassword) === true) {
      axios
        .post("https://ampere-doc-backend.onrender.com/signup", {
          email,
          password,
        })
        .then((res) => {
          login(res.data.token);
          if (res.data.token) {
            navigate("/");
          }
          setLoading(false);
        })
        .catch((err) => {
          toast(err.response.data.message);
          setLoading(false);
        });
    } else if (signupValidation(password, confirmPassword) === false) {
      toast("paswword didn't matched");
    }
  }

  function logIn(e) {
    setLoading(true);
    e.preventDefault();
    axios
      .post("https://ampere-doc-backend.onrender.com/signin", { email, password })
      .then((res) => {
        login(res.data.token);
        if (res.data.token) {
          navigate("/notes");
        }
        setLoading(false);
      })
      .catch((err) => {
        toast(err.response.data.message);
        setLoading(false);
      });
  }

  function guestLogin(e) {
    setLoading(true);
    axios
      .post("https://ampere-doc-backend.onrender.com/signin", guestLoginCredential)
      .then((res) => {
        login(res.data.token);
        const lastRoute = location?.state?.from?.pathname || "/notes";
        navigate(lastRoute);
        setLoading(false);
      })
      .catch((err) => {
        toast(err.response.data.message);
        setLoading(false);
      });
  }

  return (
    <div id="auth-main-container">
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>;
        </div>
      )}
      {!loading && (
        <div>
          <div className="page-title-wrapper tx-center mv-20">
            <h1 className="h5 black-6">Login | Signup</h1>
          </div>
          <div className="login-signup-card">
            <div className="tabs-container">
              <h1
                className={`tabs tx-center pointer ${
                  !onLogin.on ? "tabs-active" : ""
                }`}
                onClick={() => onLogin.toggle()}
              >
                LOGIN
              </h1>
              <h1
                className={`tabs tx-center pointer ${
                  onLogin.on ? "tabs-active" : ""
                }`}
                onClick={() => onLogin.toggle()}
              >
                SIGN UP
              </h1>
            </div>
            <form
              action=""
              className="auth-form"
              onSubmit={!onLogin.on ? logIn : signUp}
            >
              <Input
                label="Email"
                required={true}
                type="email"
                htmlFor="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                label="Password"
                required={true}
                type="password"
                htmlFor="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {onLogin.on ? (
                <>
                  <Input
                    label="Confirm Password"
                    required={false}
                    type="password"
                    htmlFor="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                </>
              ) : null}
              <div className="flex-between-container">
                <Checkbox
                  label="Remember me"
                  value="remember-me"
                  name="remember-me"
                />
                <p className="tx-18 tx-underline blue-4 pointer">
                  Forgot password
                </p>
              </div>
              <div className="flex-between-container">
                <button
                  type="submit"
                  className="btn btn-primary btn-md mt-20 wp-100"
                >
                  {onLogin.on ? "SIGN UP" : "LOGIN"}
                </button>
                {!onLogin.on ? (
                  <button
                    onClick={() => guestLogin()}
                    className="btn btn-primary btn-sm purple mt-20 wp-100"
                  >
                    LOGIN AS GUEST
                  </button>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
