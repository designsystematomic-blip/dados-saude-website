import styles from "./Logo.module.css";

import logoWithName from "../../assets/logoMedium.png";

export default function Logo() {
  return (
    <div className={styles.headerLogo}>
      <img src={logoWithName} alt="Logo" />
    </div>
  );
}
