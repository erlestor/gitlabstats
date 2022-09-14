import React from "react";
import "./frontPage.css";
import background from './images/background.jpg'

export function FrontPage() {
    return (
        <div style={{backgroundImage: `url(${background})`}} className="loginDiv">  
            <div className="formDiv">
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