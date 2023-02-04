import React, { Fragment, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { ref, onValue, push, set, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

import ListSummary from "../components/ListSummary";
import AddTaskIcon from "@mui/icons-material/AddTask";

import classes from "./AllLists.module.css";

function AllLists() {
  const [allLists, setAllLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        const listsRef = ref(db, `${auth.currentUser.uid}`);
        onValue(listsRef, (snapshot) => {
          const allListsObj = snapshot.val();
          console.log(allListsObj);
          const allMyLists = [];

          for (let generatedKey in allListsObj) {
            allMyLists.push({
              listId: generatedKey,
              ...allListsObj[generatedKey],
            });
          }
          setAllLists(allMyLists);
          console.log(allLists); //array of list objects
          setIsLoading(false);
        });
      } else if (!user) {
        navigate("/welcome");
      }
      console.log(auth.currentUser.uid);
    });
  }, []);

  function newListHandler() {
    const allTodosRef = ref(db, `${auth.currentUser.uid}`);
    const newTodoRef = push(allTodosRef); //push creates a new child node with unique firebase generated key with timestamp

    navigate(`/lists/${newTodoRef.key}`); //to navigate to new empty list page

    const numOfLists = allLists.length;

    const newList = {
      heading: `To Do List ${numOfLists + 1}`,
      tasksDoneCountDb: 0,
      tasks: [], //an array with objects
    };
    console.log(newList);
    set(newTodoRef, newList);
  }

  console.log(allLists);

  function listDeleteHandler(id) {
    const toDeleteRef = ref(db, `${auth.currentUser.uid}/${id}`);
    remove(toDeleteRef);
    console.log("deleted");
  }

  return ( 
    <Fragment>
      <button onClick={newListHandler} className={classes.createBtn}>
        Create New List <AddTaskIcon fontSize="small" />
      </button>
      {isLoading ? <h3>Loading lists...</h3> : ""}
      {/* using reverse() to display lists in desc order, that is most recently created first */}
      <div className={classes.container}>
        {allLists.reverse().map((list) => (
          <ListSummary
            key={list.listId}
            id={list.listId}
            title={list.heading}
            onDelete={listDeleteHandler}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default AllLists;
