import React, { useState } from "react";
import "./signIn.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../../redux/reducers/signInSlice";
import { toast } from "react-toastify";
// import { axiosInstance } from "../../services/axiosInstance";
import { setToken } from "../../redux/reducers/tokenSlice";
import { setExpirationTime } from "../../redux/reducers/tokenSlice";
import { useAxiosInstance } from "../../services/useAxiosInstance";
const SignIn = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {axiosInstance} = useAxiosInstance()

  //Toast Functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const postData = async () => {
    try {
      const res = await axiosInstance.post(`/signin`, {
        email: email,
        password: password,
      });
      if (res.data) {
     
        console.log(res.data.refreshToken);
        dispatch(setToken(res.data.accessToken))
        dispatch(setExpirationTime(res.data.accessTokenExpiration))
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(setUserLogin(true));
        navigate("/");
      }
    } catch (error) {
      notifyA("Invalid credentials");
      console.error("Error:", error);
    }
  };

  return (
    <div className="signIn">
      <div>
        <div className="loginForm">
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <input
            type="submit"
            id="login-btn"
            value="Sign In"
            onClick={() => postData()}
          />
        </div>
        <div className="loginForm2">
          Dont have an account ?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}> Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
