import styles from "./Display.module.scss";

const Display = ({ text }) => {
  return <div className={styles["text"]}>{text}</div>;
};

export default Display;
