import React from 'react'
import styles from "./Header.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@mui/material'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Header = ({ open, handleOpenCreateTask }) => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                Logo
            </div>
            <div className={styles.create_t}>
                <IconButton className={styles.icon_btn} onClick={handleOpenCreateTask}>
                    <FontAwesomeIcon icon={faPlus} className={styles.icon}/>
                </IconButton>
            </div>
        </div>
    )
}

export default Header