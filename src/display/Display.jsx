import styles from "./Display.module.scss";

const Display = ({ data, error }) => {
  return error ? <div className={styles["error"]}>{error}</div> : <div className={styles["data"]}>{data}</div>;
};

export default Display;
