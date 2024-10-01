import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Form.css";

const EnhancedLoginScreen = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const navigate = useNavigate();

  const name = method === "login" ? "Iniciar sesión" : "Registro";

  const handleClick = () => {
    if (method === "login") {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const boxes = document.querySelectorAll(".boxColor");
    boxes.forEach((box) => {
      box.addEventListener("mouseover", () => {
        box.style.backgroundColor = "#00f700";
      });
      box.addEventListener("mouseout", () => {
        setTimeout(() => {
          box.style.backgroundColor = "#1f1f1f";
        }, 400);
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const horizontal = () => {
    const horizontal = screenWidth / 50;
    const elements = [];
    for (let index = 0; index < horizontal; index++) {
      elements.push(
        <div
          key={index}
          className="boxColor"
          style={{
            height: "50px",
            width: "50px",
            backgroundColor: "#1f1f1f",
            marginRight: "4px",
            display: "inline-block",
          }}
        ></div>
      );
    }
    return elements;
  };

  const showBoxes = () => {
    const vertical = screenHeight / 50;
    const elements = [];
    for (let index = 0; index < vertical; index++) {
      elements.push(
        <div key={index} className="boxCover">
          {horizontal()}
        </div>
      );
    }
    return elements;
  };

  return (
    <div className="fullScreen">
      {showBoxes()}
      <div className="loginContainer">
        <div className="loginContent">
          <h1 className="welcomeText">{name}</h1>
          <form onSubmit={handleSubmit} className="loginForm">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
              className="inputField"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="inputField"
            />
            <div className="loadingContainer">
              {loading && <LoadingIndicator />}
            </div>
            <div className="buttonContainer">
              <button type="submit" className="loginButton">
                {name}
              </button>
              <button
                type="button"
                className="loginButton"
                onClick={handleClick}
              >
                {name === "Iniciar sesión" ? "Registro" : "Iniciar sesión"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLoginScreen;
