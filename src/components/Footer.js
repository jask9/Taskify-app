import React from "react";
import classes from "./Footer.module.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={classes.footer}>
      <p>J&J ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
