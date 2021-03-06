import { useState, useEffect } from "react";
import moment from "moment";
import { firebase } from "../firebase";
import { collatedTasksExist } from "../helpers";

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", "PWp3T53BZE5i70iHg5h6");

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where("projectId", "==", selectedProject))
        : selectedProject === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "date",
            "==",
            moment().format("DD/MM/YYYY")
          ))
        : selectedProject === "INBOX" || selectedProject === 0
        ? (unsubscribe = unsubscribe.where("date", "==", ""))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data()
      }));

      const filteredTasks =
        selectedProject === "NEXT_7"
          ? newTasks.filter(
              task =>
                moment(task.data, "DD/MM/YYYY").diff(moment(), "days") <= 7 &&
                task.archived === false
            )
          : newTasks.filter(task => task.archived === false);

      setTasks(filteredTasks);

      const filteredArchivedTasks = newTasks.filter(
        task => task.archived === true
      );

      setArchivedTasks(filteredArchivedTasks);
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};
