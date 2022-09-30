import React from "react";
import styles from "./frontPage.module.css";
import background from './images/background.jpg'
import LoginForm, { LoginFormProps }  from './LoginForm'

/**
 * Exports frontpage 
 * 
 * Takes LoginFormProps in as props and send them to the login form 
 */
export function FrontPage(props: LoginFormProps) {
    return (
        <div style={{backgroundImage: `url(${background})`}} className={styles.loginDiv}>  
            <LoginForm callback={props.callback}/>
        </div>
    );
}  