import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const { url, setToken } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => {
              setShowLogin(false);
            }}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState == "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              type="text"
              placeholder="your name:"
              value={data.name}
              required
            />
          )}
          <input
            type="email"
            onChange={onChangeHandler}
            name="email"
            placeholder="your email:"
            value={data.email}
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            placeholder="your password:"
            value={data.password}
            required
          />
        </div>
        <button type="submit">
          {currState == "Sign Up" ? "Create account" : "login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" name="" id="" required />

          <p>By continuing, I agree to the terms of use and privacy policy</p>
        </div>
        {currState == "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
