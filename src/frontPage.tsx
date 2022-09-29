import styles from "./frontPage.module.css";
import backgroundBig from "./images/backgroundBig.jpg";
import backgroundSmall from "./images/backgroundSmall.jpg";
import LoginForm, { LoginFormProps } from "./LoginForm";

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
