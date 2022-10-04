import styles from "./frontPage.module.css";
/*
 * Backgroundimage from:
 * https://www.freepik.com/free-vector/white-minimal-hexagons-background_13107746.htm#query=simplistic&position=45&from_view=search
*/
import backgroundBig from "./images/backgroundBig.jpg";
import backgroundSmall from "./images/backgroundSmall.jpg";
import LoginForm, { LoginFormProps } from "./LoginForm";

/**
 * Exports frontpage 
 * 
 * Takes LoginFormProps in as props and send them to the login form 
 */
export function FrontPage(props: LoginFormProps) {
  return (
    <div
      style={{
        backgroundImage: `-webkit-image-set(
            url(${backgroundSmall}) 2x,
            url(${backgroundBig}) 3x)`,
      }}
      className={styles.loginDiv}
    >
      <LoginForm callback={props.callback} />
    </div>
  );
}
