"use client";
import { db } from '@/config/firebase';
import { addDoc, collection } from '@firebase/firestore';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/AdapterDayjs"
import dayjs from 'dayjs';
import React, { useState } from 'react'

const CreateTask = ({ open, handleCloseCreateTask }) => {
    // State to store newTask data
    const [newTask, setNewTask] = useState({
        task: '',
        description: '',
        expDate: dayjs()
    })

    // Success alert control state
    const [alert, setAlert] = useState(false);

    // Create task
    const handleCreate = async (e) => {
        e.preventDefault()
        if (newTask.task !== '' && newTask.description != '' && newTask.expDate != dayjs()) {
            await addDoc(collection(db, 'tasks'), {
                task: newTask.task,
                description: newTask.description,
                expDate: newTask.expDate.$d
            });
            setNewTask({
                task: '',
                description: '',
                expDate: dayjs()
            })
            handleCloseCreateTask();
            setAlert(true);
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
                    Tarea creada exitosamente!
                </Alert>
            </Snackbar>
            <Dialog open={open} onClose={handleCloseCreateTask}>
                <DialogTitle>Crear tarea</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ingresa los datos solicitados para crear una tarea.
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateTask} type='submit'>Cancelar</Button>
                    <Button onClick={handleCreate}>Crear</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateTask