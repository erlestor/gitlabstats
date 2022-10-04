import styles from "./authenticationPage.module.css"
/*
 * Backgroundimage from:
 * https://www.freepik.com/free-vector/white-minimal-hexagons-background_13107746.htm#query=simplistic&position=45&from_view=search
*/
import backgroundBig from "../../images/backgroundBig.jpg"
import backgroundSmall from "../../images/backgroundSmall.jpg"
import AuthenticationForm, {
  AuthenticationFormProps,
} from "./AuthenticationForm"

/**
 * Exports frontpage 
 * 
 * Takes LoginFormProps in as props and send them to the login form 
 */
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
  )
}
