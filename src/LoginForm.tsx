import React from "react";
import styles from "./frontPage.module.css";
import { RepoInformation } from "./getRepoInformation";

/**
 * Define LoginFormProps
 */
export type LoginFormProps = {
  callback: (repoInformation: RepoInformation) => void;
};

/**
 * Exports the login form
 */
export default class LoginForm extends React.Component<

  LoginFormProps,
  {
    token: string;
    projectId: number | undefined;
  }
> {
  /**
   * Costructor which changes the classes state based on LoginFormProps
   */
  constructor(props: LoginFormProps) {
    super(props);

    this.state = {
      token: "",
      projectId: undefined,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
 * Function which runs every time the user modifies values in the input fields
 * 
 * Uses event to access the targeted input field and get its new value
 */
  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  /**
 * Function which runs when the user click the login button
 * 
 * Sends the values in the state up the hierarchy with callback-function
 */
  handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.callback(this.state as RepoInformation);
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
            required
          />
          <input
            placeholder="Project ID"
            type="number"
            name="projectId"
            min={1}
            value={this.state.projectId}
            onChange={this.handleChange}
            required
          />
          <button>Logg inn</button>
        </form>
      </div>
    );
  }
}
