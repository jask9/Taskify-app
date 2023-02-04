import React from "react";
import { Fragment } from "react";
import classes from "./Homepage.module.css";
import listImg from "../images/list.png";

function Homepage() {
  return (
    <Fragment>
      <div className={classes.row}>
        <div className={classes.column1}>
          <h1>Organise your tasks, organise your life.</h1>
          <p>
            All your tasks in one place! Nothing seems like a lot, when this is
            the app you got!
          </p>
          <a href="/lists">
            <button type="button" className={classes.btn}>
              Let's Go!
            </button>
          </a>
        </div>
        <div className={classes.column2}>
          <img src={listImg} alt="to-do-list" width="550px" />
        </div>
      </div>
    </Fragment>
  );
}

export default Homepage;
