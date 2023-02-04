import React, { useState, useEffect, Fragment } from "react";
import { db, auth } from "../firebase";
import { ref, onValue, set, push, update, remove } from "firebase/database";
import { useNavigate, useParams, Link } from "react-router-dom";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import FilterButton from "./FilterButton";
import ListHeading from "./ListHeading";
import InputForm from "./InputForm";
import ListItem from "./ListItem";

import classes from "./List.module.css";

function List(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [listHeading, setListHeading] = useState("");
  const [tasksDoneCount, setTasksDoneCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        // GETTING HEADING DATA------------------------------------------------------------
        const headingRef = ref(
          db,
          `${auth.currentUser.uid}/${params.listId}/heading`
        );
        onValue(headingRef, (snapshot) => {
          const listHeadingVal = snapshot.val();
          console.log(listHeadingVal);
          setListHeading(listHeadingVal);
        });

        // GETTING TASKS DONE COUNT----------------------------------------------------------
        const countRef = ref(
          db,
          `${auth.currentUser.uid}/${params.listId}/tasksDoneCountDb`
        );
        onValue(countRef, (snapshot) => {
          const tasksDoneCountVal = Number(snapshot.val());
          setTasksDoneCount(tasksDoneCountVal);
          console.log(tasksDoneCount);
        });

        // GETTING TASKS----------------------------------------------------------------------
        const todoRef = ref(
          db,
          `${auth.currentUser.uid}/${params.listId}/tasks`
        );
        onValue(todoRef, (snapshot) => {
          const allTasksObj = snapshot.val();
          const allTasks = [];

          for (let generatedKey in allTasksObj) {
            allTasks.push({ id: generatedKey, ...allTasksObj[generatedKey] });
          }
          setTasks(allTasks);
          setIsLoading(false);
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  function addTaskHandler(inputTask) {
    if (inputTask.trim().length > 0) {
      const todoRef = ref(db, `${auth.currentUser.uid}/${params.listId}/tasks`);
      const newTodoRef = push(todoRef); //push creates a new child node with unique firebase generated key with timestamp

      const newTask = {
        name: inputTask,
        completed: false,
      };

      set(newTodoRef, newTask); //newTask obj gets created at that new node with unique key
    } else {
      return;
    }
  }

  function editTaskHandler(id, editedName) {
    const toEditRef = ref(
      db,
      `${auth.currentUser.uid}/${params.listId}/tasks/${id}`
    );

    const editedTask = {
      name: editedName,
    };

    update(toEditRef, editedTask);
  }

  function deleteTaskHandler(id) {
    const toDeleteRef = ref(
      db,
      `${auth.currentUser.uid}/${params.listId}/tasks/${id}`
    );
    remove(toDeleteRef);
    console.log("deleted");

    // TO UPDATE TASKS DONE COUNT
    tasks.forEach((task) => {
      if (task.id === id && task.completed) {
        // if it is the task we deleted (id matches) and is also checked (completed), so decrease count of completed tasks that is x in "x out of y tasks completed"
        const toUpdateCountRef = ref(
          db,
          `${auth.currentUser.uid}/${params.listId}`
        );

        const updatedTaskCount = {
          tasksDoneCountDb: tasksDoneCount - 1,
        };

        update(toUpdateCountRef, updatedTaskCount);
      }
    });
  }

  function toggleTaskCompletedHandler(id, presentStatus) {
    //passed the completed prop of the task as "presentStatus"
    const toToggleRef = ref(
      db,
      `${auth.currentUser.uid}/${params.listId}/tasks/${id}`
    );

    const statusToggledTask = {
      completed: !presentStatus,
    };

    update(toToggleRef, statusToggledTask);

    // TO UPDATE TASKS DONE COUNT
    tasks.forEach((task) => {
      if (task.id === id) {
        const toUpdateCountRef = ref(
          db,
          `${auth.currentUser.uid}/${params.listId}`
        );
        //if task completed
        if (presentStatus) {
          // if value is true, it will be toggled to false so minus
          update(toUpdateCountRef, {
            tasksDoneCountDb: tasksDoneCount - 1,
          });
        } else {
          // if value is false, it will be toggled to true so plus
          update(toUpdateCountRef, {
            tasksDoneCountDb: tasksDoneCount + 1,
          });
        }
      }
    });
  }

  function headingEditHandler(editedHeading) {
    const toEditRef = ref(db, `${auth.currentUser.uid}/${params.listId}`);

    const listHeading = {
      //an object
      heading: editedHeading, //creates node "heading" and stores the value in it, we do this coz can only pass objects as arguments to firebase
    };
    update(toEditRef, listHeading);
  }

  function saveListHandler() {
    console.log("List saved");
  }

  const tasksCount = tasks.length;
  const tasksNoun = tasks.length !== 1 ? "tasks" : "task";

  // using the Object.keys() method to collect an array of FILTER_NAMES
  const FILTER_NAMES = Object.keys(props.filterMap);

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter} //pressed if the name matches the current value of our filter state
      setFilter={setFilter}
    />
  ));

  const taskList = tasks
    ? tasks
        .filter(props.filterMap[filter])
        .map((task) => (
          <ListItem
            key={task.id}
            id={task.id}
            name={task.name}
            completed={task.completed}
            toggleTaskCompletedHandler={toggleTaskCompletedHandler}
            onEdit={editTaskHandler}
            onDelete={deleteTaskHandler}
          />
        ))
    : "";

  return (
    <Fragment>
      <div className={classes.btnContainer}>{filterList}</div>
      <div className={classes.listContainer}>
        {isLoading ? (
          <h3>Loading list...</h3>
        ) : (
          <Fragment>
            <ListHeading
              listHeading={listHeading ? listHeading : "Set List Heading"}
              onEdit={headingEditHandler}
            />

            <InputForm onAdd={addTaskHandler} />
            <h4>{`---- ${tasksDoneCount} out of ${tasksCount} ${tasksNoun} completed ----`}</h4>
            <ul>{taskList}</ul>
            <Link
              className={classes.back}
              to="/lists"
              onClick={saveListHandler}
            >
              <ArrowBackOutlinedIcon />
              <span> Go back</span>
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default List;
