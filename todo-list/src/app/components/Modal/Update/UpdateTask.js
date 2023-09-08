"use client";
import { db } from '@/config/firebase';
import { updateDoc, collection, doc, getDoc } from '@firebase/firestore';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Skeleton, Snackbar, TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/AdapterDayjs"
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'

const UpdateTask = ({ open, handleCloseUpdateTask, id }) => {
    // State to store task data
    const [newTask, setNewTask] = useState({
        task: '',
        description: '',
        expDate: dayjs()
    })

    // Loading state
    const [loading, setLoading] = useState(true);

    // Success alert control state
    const [alert, setAlert] = useState(false);

    // Get default values of task
    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const taskRef = doc(db, 'tasks', id);
                const taskSnapshot = await getDoc(taskRef);

                if (taskSnapshot.exists()) {
                    const taskData = taskSnapshot.data();
                    setNewTask({
                        task: taskData.task || '',
                        description: taskData.description || '',
                        expDate: taskData.expDate ? dayjs(taskData.expDate.toDate()) : dayjs()
                    });
                } else {
                    console.log('La tarea no existe.');
                }
            } catch (error) {
                console.error('Error al obtener la tarea:', error);
            } finally {
                setLoading(false);
            }
        };

        if (open) {
            fetchTaskData();
            setLoading(true);
        }
    }, [open, id]);

    // Update task
    const handleUpdate = async (e) => {
        e.preventDefault()
        
        try {
            const taskRef = doc(db, 'tasks', id);
            await updateDoc(taskRef, {
                task: newTask.task,
                description: newTask.description,
                expDate: newTask.expDate.$d
            });

            setNewTask({
                task: newTask.task,
                description: newTask.description,
                expDate: dayjs(newTask.expDate.$d)
            });
            handleCloseUpdateTask();
            setAlert(true);
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
        }
    };

    // Close success alert
    const handleCloseAlert = (event, reason) => {
        if (reason == "clickaway") {
            return;
        }
        setAlert(false);
    };


    return (
        <div>
            <Snackbar open={alert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity='success' sx={{ width: "100%" }}>
                    Tarea actualizada exitosamente!
                </Alert>
            </Snackbar>
            <Dialog open={open} onClose={handleCloseUpdateTask}>
                <DialogTitle>Actualizar tarea</DialogTitle>
                    <DialogContent>
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
                        <>
                            <DialogContentText>
                                    Modifica los campos que deseas actualizar de una tarea.
                            </DialogContentText>
                            <TextField
                                margin='dense'
                                id='task'
                                label='Tarea'
                                type='text'
                                fullWidth
                                variant='outlined'
                                required
                                value={newTask.task}
                                onChange={(e) => setNewTask({...newTask, task: e.target.value})}
                            />
                            <TextField
                                margin='dense'
                                id='task'
                                label='Descripción'
                                type='text'
                                fullWidth
                                variant='outlined'
                                required
                                value={newTask.description}
                                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label='Fecha de vencimiento'
                                    sx={{ width: "100%" }}  
                                    required
                                    value={newTask.expDate}
                                    onChange={(e) => setNewTask({...newTask, expDate: dayjs(e)})}                          
                                />
                            </LocalizationProvider>
                        </>
                        )}
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUpdateTask} type='submit'>Cancelar</Button>
                    <Button onClick={handleUpdate}>Actualizar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UpdateTask