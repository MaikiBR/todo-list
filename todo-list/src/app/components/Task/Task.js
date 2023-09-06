"use client";
import { useState } from 'react'
import { Alert, Card, CardContent, CardHeader, IconButton, Menu, MenuItem, Snackbar, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteDoc, doc } from '@firebase/firestore';
import { db } from '@/config/firebase';

const Task = ({ id, task, description, expDate }) => {
    // State for task option menu (Edit and Delete)
    const [anchor, setAnchor] = useState(null);

    // Show task option menu
    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };

    // Close option menu
    const handleClose = () => {
        setAnchor(null)
    };

    // Delete task
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'tasks', id));
        handleClose();
    }

    return (
        <Card
            sx={{
                width: 500,
                height: 150,
                padding: 2, 
                backgroundColor: "antiqueWhite", 
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
            }}
        >
            <CardHeader
                title={task}
                subheader={`Fecha de vencimiento: ${expDate}`}
                action={
                    <>
                        <IconButton
                            sx={{
                                width: 30,
                                height: 30
                            }} 
                            size="large" 
                            children={<FontAwesomeIcon icon={faEllipsisVertical} style={{ fontSize: '24px' }}/>}
                            onClick={handleClick}
                        />
                        <Menu
                            anchorEl={anchor}
                            open={Boolean(anchor)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose} ><FontAwesomeIcon icon={faEdit} /> Editar</MenuItem>
                            <MenuItem onClick={() => handleDelete(id)}><FontAwesomeIcon icon={faTrash} /> Eliminar</MenuItem>
                        </Menu>
                    </>
                }
            />
            <CardContent>
                <Typography>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Task