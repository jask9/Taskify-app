import React from "react";
import { Link } from "react-router-dom";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import classes from "./ListSummary.module.css";

function ListSummary(props) {
  return (
    <div className={classes.listHeadingSummary}>
      {props.title.length > 16 ? (
        <Link to={`/lists/${props.id}`}>
          <h1>{`${props.title.substring(0, 13)}...`}</h1>
        </Link>
      ) : (
        <Link to={`/lists/${props.id}`}>
          <h1>{props.title}</h1>
        </Link>
      )}

      <div>
        <Link to={`/lists/${props.id}`}>
          <button className={classes.actionBtn}>
            <EditOutlinedIcon fontSize="small" />
          </button>
        </Link>

        <button
          className={classes.actionBtn}
          onClick={() => props.onDelete(props.id)}
        >
          <DeleteOutlinedIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}

export default ListSummary;
