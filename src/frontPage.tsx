import React from "react";
import styles from "./frontPage.module.css";
import background from './images/background.jpg'

export function FrontPage() {
    return (
        <div style={{backgroundImage: `url(${background})`}} className={styles.loginDiv}>  
            <div className={styles.formDiv}>
                <form>
                    <h3>LOGG INN</h3>
                    <input placeholder="Brukernavn" type="text"/>
                    <input placeholder="Passord" type="password"/>
                    <button>Logg inn</button>
                </form>
            </div>
        </div>
    );
}