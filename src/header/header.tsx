import styles from "./header.module.css";

/**
 * Exports header 
 * 
 * Takes setShowFrontPage as props which decides whether the user is displayed frontpage or analytics page
 */
export default function Header(props: {
    setShowFrontPage: (show: boolean) => void
}) {

    /**
     * Handles logout 
     * Clear local storage and shows frontpage
     */
    function handleLogout() {
        localStorage.clear();
        props.setShowFrontPage(true);
    }

    return (
        <header className={styles.header}>
            <h1>GitLab Stats Pro+</h1>
                <button onClick={handleLogout}>Logout</button>
        </header>
    );
}