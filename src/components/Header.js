import React, { useState, useEffect, Fragment } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

import TaskIcon from "@mui/icons-material/Task";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import classes from "./Header.module.css";

function Header() {
  const [openNav, setOpenNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log(user)
        setIsLoggedIn(true);
        setUserEmail(user.email);
      } else if (!user) {
        setIsLoggedIn(false);
      }
    });
  }, []);

  function signOutHandler() {
    signOut(auth).catch((err) => {
      alert(err.message);
    });
  }

  function openNavHandler() {
    setOpenNav(true);
  }

  function closeNavHandler() {
    setOpenNav(false);
  }

  const hamburgerMenuBtn = (
    <span className={classes.menuBtn} onClick={openNavHandler}>
      &#9776;
    </span>
  );

  const responsiveSideNavbar = (
    <div className={classes.sideNav} id="sideNav">
      <a href="#" className={classes.closeBtn} onClick={closeNavHandler}>
        &#10006;
      </a>
      <a href="/">Home</a>
      <a href={isLoggedIn ? "/lists" : "/welcome"}>My Lists</a>
      {!isLoggedIn ? (
        <Fragment>
          <a href="/welcome">
            <button type="button" className={classes.btn}>
              Create an account
            </button>
          </a>
          <a href="/welcome">
            <button type="button" className={classes.btn}>
              Sign in
            </button>
          </a>
        </Fragment>
      ) : (
        <Fragment>
          <p>{userEmail}</p>
          <a href="/">
            <button
              onClick={signOutHandler}
              type="button"
              className={classes.btn}
            >
              Sign out
            </button>
          </a>
        </Fragment>
      )}
    </div>
  );

  return (
    <nav>
      <div className={classes.logo}>
        <TaskIcon fontSize="large" className={classes.logos} />
        <h1>Taskify</h1>
      </div>
      {!openNav ? hamburgerMenuBtn : responsiveSideNavbar}
      <div className={classes.navLinks}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href={isLoggedIn ? "/lists" : "/welcome"}>My Lists</a>
          </li>

          {!isLoggedIn ? (
            <Fragment>
              <li>
                <a href="/welcome">
                  <button className={classes.btn} type="button">
                    Sign in
                  </button>
                </a>
              </li>
              <li>
                <a href="/welcome">
                  <button className={classes.btn} type="button">
                    Create an account
                  </button>
                </a>
              </li>
            </Fragment>
          ) : (
            <li>
              <p>{userEmail}</p>
              <div className={classes.tooltip}>
                <a href="/">
                  <button
                    onClick={signOutHandler}
                    className={` ${classes.logoutIcon}`}
                    type="button"
                  >
                    <LogoutOutlinedIcon />
                  </button>
                </a>
                <span className={classes.tooltiptext}>Sign out</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
