import { capitalize } from "../../../utils";
import styles from "./Header.module.scss";

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

const Header = () => {
  return (
    <div className={styles["header"]}>
      {DAYS.map((day, index) => (
        <div key={index}>{capitalize(day)}</div>
      ))}
    </div>
  );
};

export default Header;
