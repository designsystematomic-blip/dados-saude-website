import { Text } from "dados-saude";
import { Link } from "react-router";
import styles from "./RegisterText.module.css";

export default function RegisterText() {
  return (
    <div className={styles.register}>
      <Text content="Você não tem uma conta?" textSize="medium" fontFamily="primary" />
      <Link
        to={"/register"}
        className={styles.signUp + " " + "textMedium fontSecondary"}
      >
        Cadastre-se
      </Link>
    </div>
  );
}
