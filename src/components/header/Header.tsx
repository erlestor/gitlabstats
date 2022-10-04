import styles from "./header.module.css"

export default function Header(props: {
  setShowAuthenticationPage: (show: boolean) => void
}) {
  function handleLogout() {
    localStorage.clear()
    props.setShowAuthenticationPage(true)
  }

  return (
    <header className={styles.header}>
      <h1 data-testid="header">GitLab Stats Pro</h1>
      <button onClick={handleLogout} data-testid="header-log-out">
        Logout
      </button>
    </header>
  )
}
