import React, { Fragment, useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

import classes from "./ListHeading.module.css";

function ListHeading(props) {
  const [isEditing, setEditing] = useState(false);
  const [editedHeading, setEditedHeading] = useState("");

  function inputChangeHandler(e) {
    setEditedHeading(e.target.value);
  }

  function editSubmitHandler(e) {
    e.preventDefault();
    if (editedHeading.trim().length > 0) {
      props.onEdit(editedHeading);
    }

    setEditedHeading("");
    setEditing(false);
  }

  const viewTemplate = (
    <Fragment>
      <div className={classes.heading}>
        <h1>{props.listHeading}</h1>
        <button className={classes.actionBtn} onClick={() => setEditing(true)}>
          <EditOutlinedIcon fontSize="small" />
        </button>
      </div>
    </Fragment>
  );

  const editingTemplate = (
    <div className={classes.heading}>
      <form className={classes.form} onSubmit={editSubmitHandler}>
        <input
          type="text"
          onChange={inputChangeHandler}
          value={editedHeading}
          maxLength="30"
        />

        <button
          className={classes.actionBtn}
          type="button"
          onClick={() => setEditing(false)}
        >
          <ClearOutlinedIcon color="error" />
        </button>
        <button className={classes.actionBtn} type="submit">
          <DoneOutlinedIcon color="success" />
        </button>
      </form>
    </div>
  );

  return <Fragment>{isEditing ? editingTemplate : viewTemplate}</Fragment>;
}

export default ListHeading;
