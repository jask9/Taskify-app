import React, { Fragment, useState } from "react";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

import classes from "./ListItem.module.css";

function ListItem(props) {
  const [isEditing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState("");

  function inputChangeHandler(event) {
    setEditedName(event.target.value);
  }

  function editSubmitHandler(event) {
    event.preventDefault();
    if (editedName.trim().length > 0) {
      props.onEdit(props.id, editedName);
    }
    setEditedName("");
    setEditing(false);
  }

  function toggleTaskCompleted() {
    props.toggleTaskCompletedHandler(props.id, props.completed);
  }

  const editingTemplate = (
    <form className={classes.form} onSubmit={editSubmitHandler}>
      <input
        id={props.id}
        type="text"
        onChange={inputChangeHandler}
        value={editedName}
        maxLength="250"
      />
      <button
        className={classes.cancel}
        type="button"
        onClick={() => setEditing(false)}
      >
        <ClearOutlinedIcon color="error" />
      </button>
      <button className={classes.save} type="submit">
        <DoneOutlinedIcon color="success" />
      </button>
    </form>
  );

  const viewTemplate = (
    <Fragment>
      <table>
        <tbody>
          <tr>
            <td>
              <input
                id={props.id}
                type="checkbox"
                defaultChecked={props.completed}
                onChange={toggleTaskCompleted}
                className={classes.checkbox}
              />
            </td>
            <td className={classes.taskContent}>
              <label
                className={props.completed ? `${classes.taskDone}` : ""}
                htmlFor={props.id}
              >
                {props.name}
              </label>
            </td>
            <td>
              <button className={classes.edit} onClick={() => setEditing(true)}>
                <EditOutlinedIcon fontSize="small" />
              </button>

              <button
                className={classes.delete}
                onClick={() => {
                  props.onDelete(props.id);
                }}
              >
                <DeleteOutlinedIcon fontSize="small" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );

  return <li>{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default ListItem;

