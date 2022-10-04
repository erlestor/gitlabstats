import React from "react"
import styles from "./authenticationPage.module.css"
import { RepoInformation } from "../../services/getRepoInformation"
import { validateRepoInformation } from "../../services/gitlabService"

export type AuthenticationFormProps = {
  callback: (repoInformation: RepoInformation) => void
}

export default class AuthenticationForm extends React.Component<
  AuthenticationFormProps,
  {
    token: string
    projectId: number | string
    error: string
  }
> {
  constructor(props: AuthenticationFormProps) {
    super(props)

    this.state = {
      token: "",
      projectId: "",
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
    const projectId = Number(this.state.projectId)

    await validateRepoInformation({ projectId, token })
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
          <h3>Insert Repository Information</h3>
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
          <button data-testid="loginBtn">OK</button>
          {!!this.state.error && (
            <p className={styles.error}>{this.state.error}</p>
          )}
        </form>
      </div>
    )
  }
}
