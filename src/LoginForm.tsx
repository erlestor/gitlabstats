import React from 'react';
import styles from "./frontPage.module.css";

export type LoginFormProps = {
    callback: (token: string, password: string) => void
}

export default class LoginForm extends React.Component<LoginFormProps, any> {
    
    constructor(props: LoginFormProps) {
        super(props);
    
        this.state = {
            token: '',
            password: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.callback(this.state.token, this.state.password);
        localStorage.setItem("Token", this.state.token);
        localStorage.setItem("Password", this.state.password);
    }

    render() {
        return (
            <div className={styles.formDiv}>
                <form onSubmit={this.handleSubmit}>
                    <h3>LOGG INN</h3>
                    <input 
                        placeholder="Token" 
                        type="text" 
                        name="token"
                        value={this.state.token} 
                        onChange={this.handleChange}
                    />
                    <input 
                        placeholder="Passord" 
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button>Logg inn</button>
                </form>
            </div>
        );
    }
}