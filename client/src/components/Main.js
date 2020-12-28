import React, { Fragment } from "react";
import "./Main.css";
import mainPagefashion from "../img/mainPagefashion.png";
const Main = () => {
  return (
    <Fragment>
      <div className="container">
        <ul className="nav justify-content-end my-3">
          <li className="nav-item">
            <a className="nav-link" href="/register">
              Join now
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link btn btn-outline-primary" aria-current="page" href="/login">
              Sign in
            </a>
          </li>
        </ul>
        <div className="container my-5">
          <div className="row">
            <div className="col-sm">
              <h1 className="mainPage-h1">
                Welcome to your Fashion Model search
              </h1>
            </div>
            <div className="col-sm">
              <img src={mainPagefashion} width="100%" height="400" alt="Logo" />
            </div>
          </div>
          <div className="row my-3">
          <div className="col-sm">
              <h2 className="mainPage-h2">Find fashion, fitness and photography models</h2>
              
              </div>
              <div className="col-sm">
              <h2 className="mainPage-h2">Find fashion, fitness and photography models</h2>
              
              </div>
          </div>

        </div>
      </div>
    </Fragment>
  );
};

export default Main;
