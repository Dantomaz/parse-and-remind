import { createPortal } from "react-dom";
import styles from "./Spinner.module.scss";

const Spinner = ({ show, text }) => {
  return (
    show &&
    createPortal(
      <div className={styles["backdrop"]}>
        <div className={styles["container"]}>
          <p>{text || "Please wait..."}</p>
          <div className={styles["spinner"]}></div>
        </div>
      </div>,
      document.body
    )
  );
};

export default Spinner;
