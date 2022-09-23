import React from "react";
import styles from "./frontPage.module.css";
import background from './images/background.jpg'
import LoginForm  from './LoginForm'

export function FrontPage() {
    return (
        <div style={{backgroundImage: `url(${background})`}} className={styles.loginDiv}>  
            <LoginForm/>
        </div>
    );
}