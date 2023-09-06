"use client";
import styles from './page.module.css'
import Header from './components/Header/Header'
import Task from './components/Task/Task'
import { useEffect, useState } from 'react'
import { db } from '@/config/firebase';
import { collection, query, onSnapshot } from '@firebase/firestore';
import CreateTask from './components/Modal/Create/CreateTask';
import { Skeleton } from '@mui/material';

export default function Home() {
  // State to store the tasks fetched from the database
  const [tasks, setTasks] = useState([]);

  // Loading state
  const [loading, setLoading] = useState((true));

  // State to manage the 'open' status of the CreateTask dialog
  const [open, setOpen] = useState(false);

  // Function to open/close the CreateTask dialog
  const handleOpenCreateTask = () => {
    setOpen(true);
  };

  // Function to close the CreateTask dialog
  const handleCloseCreateTask = () => {
    setOpen(false);
  };

  // Read tasks from database
  useEffect(() => {
    const q = query(collection(db, 'tasks'));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let tasksArr = [];

      QuerySnapshot.forEach((task) => {
        tasksArr.unshift({...task.data(), id: task.id});
      });
      setTasks(tasksArr);
      setLoading(false); // Data is loaded
    })
  }, []);
  
  return (
    <main className={styles.main}>
      <div className={styles.header_cont}>
        <Header open={open} handleOpenCreateTask={handleOpenCreateTask} />
      </div>
      <div className={styles.content}>
        <CreateTask open={open} handleCloseCreateTask={handleCloseCreateTask} />
        <div className={styles.tasks}>
          {loading ? (
            <>
              <Skeleton 
                variant="rounded" 
                width={"100%"} 
                height={"100%"} 
                sx={{ backgroundColor: "lightgray" }}
              />
            </>
          ) : (
            tasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                task={task.task}
                description={task.description}
                expDate={task.expDate.toDate().toLocaleString()}
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
}
