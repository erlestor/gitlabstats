import styles from "./authenticationPage.module.css";
import backgroundBig from "../images/backgroundBig.jpg";
import backgroundSmall from "../images/backgroundSmall.jpg";
import AuthenticationForm, { AuthenticationFormProps } from "./authenticationForm";

export function AuthenticationPage(props: AuthenticationFormProps) {
  return (
    <div
      style={{
        backgroundImage: `-webkit-image-set(
            url(${backgroundSmall}) 2x,
            url(${backgroundBig}) 3x)`,
      }}
      className={styles.loginDiv}
    >
      <AuthenticationForm callback={props.callback} />
    </div>
  );
}
