import React from "react";
import classes from "./FilterButton.module.css"

function FilterButton(props) {
  return (
    <button
      className={props.isPressed ? `${classes.pressedFilterButton}` : `${classes.filterButton}`}
      type="button"
      onClick={() => props.setFilter(props.name)}
    >
      <span>{props.name}</span>
    </button>
  );
}

export default FilterButton;
