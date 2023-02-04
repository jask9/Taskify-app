import React, { Fragment, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import classes from "./Welcome.module.css";

function Welcome() {
  const [signUpForm, setSignUpForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        // if user exists (is logged in, we get navigated to all lists page that is we don't need to sign in again, unless logged out)
        navigate("/lists");
      }
    });
  }, []);

  function emailChangeHandler(e) {
    setEmail(e.target.value);
  }

  function passwordChangeHandler(e) {
    setPassword(e.target.value);
  }

  function signInHandler(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/lists"))
      .catch((err) => alert(err.message));
  }

  function signUpHandler(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/lists"))
      .catch((err) => console.log(err));
  }

  const containerClasses = signUpForm
    ? `${classes.container1} ${classes["right-panel-active"]}`
    : `${classes.container1}`;

  return (
    <Fragment>
      <div className={containerClasses} id="container1">
        <div
          className={`${classes["form-container"]} ${classes["sign-up-container"]}`}
        >
          <form onSubmit={signUpHandler}>
            <h1>Create Account</h1>
            <input
              onChange={emailChangeHandler}
              value={email}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={passwordChangeHandler}
              value={password}
              type="password"
              placeholder="Password"
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div
          className={`${classes["form-container"]} ${classes["sign-in-container"]}`}
        >
          <form onSubmit={signInHandler}>
            <h1>Sign in</h1>
            <input
              onChange={emailChangeHandler}
              value={email}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={passwordChangeHandler}
              value={password}
              type="password"
              placeholder="Password"
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className={classes["overlay-container"]}>
          <div className={classes.overlay}>
            <div
              className={`${classes["overlay-panel"]} ${classes["overlay-left"]}`}
            >
              <h1>Welcome Back!</h1>
              <p>Sign in now to start managing your tasks in no time.</p>
              <button
                className={classes.ghost}
                id="signIn"
                onClick={() => setSignUpForm(false)}
              >
                Sign In
              </button>
            </div>
            <div
              className={`${classes["overlay-panel"]} ${classes["overlay-right"]}`}
            >
              <h1>Hello, Friend!</h1>
              <p>
                Become focused, organised, and calm with Taskify. Sign up now to
                keep a track of your tasks!
              </p>
              <button
                className={classes.ghost}
                id="signUp"
                onClick={() => setSignUpForm(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Welcome;
