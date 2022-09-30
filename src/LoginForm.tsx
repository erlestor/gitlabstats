import React from "react"
import styles from "./frontPage.module.css"
import { getRepoInformation, RepoInformation } from "./getRepoInformation"
import { checkIfValidId, getAllMembers } from "./services/gitlabService"

export type LoginFormProps = {
  callback: (repoInformation: RepoInformation) => void
}

export default class LoginForm extends React.Component<
  LoginFormProps,
  {
    token: string
    projectId: number | undefined
    error: string
  }
> {
  constructor(props: LoginFormProps) {
    super(props)

    this.state = {
      token: "",
      projectId: undefined,
      error: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ ...this.state, [event.target.name]: event.target.value })
  }

  async handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const token = this.state.token
    const projectId = this.state.projectId

    await checkIfValidId(Number(projectId), token)
      .then((valid) => {
        if (valid) {
          this.setState({ error: "" })
          this.props.callback(this.state as RepoInformation)
          return
        }
        this.setState({ error: "Wrong token or projectId" })
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
          {this.state.error.length > 0 && (
            <p className={styles.error}>{this.state.error}</p>
          )}
        </form>
      </div>
    )
  }
}
