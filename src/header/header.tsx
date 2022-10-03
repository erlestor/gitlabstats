import styles from "./header.module.css";

export default function Header(props: {
    setShowFrontPage: (show: boolean) => void
}) {

    function handleLogout() {
        localStorage.clear();
        props.setShowFrontPage(true);
    }

    return (
        <header className={styles.header}>
            <h1>GitLab Stats Pro</h1>
                <button onClick={handleLogout}>Logout</button>
        </header>
    );
}