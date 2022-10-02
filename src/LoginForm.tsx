import React from "react"
import styles from "./frontPage.module.css"
import { RepoInformation } from "./getRepoInformation"
import { validateRepoInformation } from "./services/gitlabService"

/**
 * Define LoginFormProps
 */
export type LoginFormProps = {
  callback: (repoInformation: RepoInformation) => void
}

/**
 * Exports the login form
 */
export default class LoginForm extends React.Component<

  LoginFormProps,
  {
    token: string
    projectId: number | string
    error: string
  }
> {
  /**
   * Costructor which changes the classes state based on LoginFormProps
   */
  constructor(props: LoginFormProps) {
    super(props)

    this.state = {
      token: "",
      projectId: "",
      error: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /**
 * Function which runs every time the user modifies values in the input fields
 * 
 * Uses event to access the targeted input field and get its new value
 */
  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ ...this.state, [event.target.name]: event.target.value })
  }

  async handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const token = this.state.token
    const projectId = Number(this.state.projectId)

    await validateRepoInformation({projectId, token})
      .then((valid) => {
        if (valid) {
          this.setState({ error: "" })
          this.props.callback(this.state as RepoInformation)
        }
      })
      .catch((err) => {
        this.setState({ error: "Wrong token or projectId" })
      })
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
            placeholder="ProjectID"
            type="number"
            name="projectId"
            min={1}
            value={this.state.projectId}
            onChange={this.handleChange}
            required
          />
          <button data-testid="loginBtn">Logg inn</button>
          {!!this.state.error && (
            <p className={styles.error}>{this.state.error}</p>
          )}
        </form>
      </div>
    )
  }
}
