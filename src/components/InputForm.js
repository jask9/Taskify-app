import React, { useState } from "react";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import classes from "./InputForm.module.css";

function InputForm(props) {
  const [inputTask, setInputTask] = useState("");

  function inputChangeHandler(event) {
    setInputTask(event.target.value);
  }

  function addNewTask() {
    props.onAdd(inputTask);
    setInputTask("");
  }

  return (
    <div className={classes.form}>
      <input
        onChange={inputChangeHandler}
        type="text"
        value={inputTask}
        maxLength="250"
      />
      <Fab size="small" onClick={addNewTask}>
        <AddIcon  />
      </Fab>
    </div>
  );
}

export default InputForm;
