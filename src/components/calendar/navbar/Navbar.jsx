import { useContext } from "react";
import { GrPowerReset } from "react-icons/gr";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { getMonthName } from "../../../utils";
import Button from "../../button/Button";
import { CalendarContext } from "../CalendarProvider";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { currentDate, changeDate, resetDate } = useContext(CalendarContext);

  return (
    <div className={styles["navigation"]}>
      <div className={styles["flex-group"]}>
        <Button theme="ghost" className={styles["btn-animated"]} onClick={() => changeDate("year", -1)}>
          <MdKeyboardDoubleArrowLeft />
        </Button>
        <Button theme="ghost" className={styles["btn-animated"]} onClick={() => changeDate("month", -1)}>
          <MdKeyboardArrowLeft />
        </Button>
      </div>
      <div className={styles["flex-group"]}>
        <h1 className={styles["flex-group"]}>
          <span>{getMonthName(currentDate.month)}</span>
          <span>{currentDate.year}</span>
        </h1>
        <Button theme="ghost" className={styles["btn-animated"]} onClick={resetDate}>
          <GrPowerReset />
        </Button>
      </div>
      <div className={styles["flex-group"]}>
        <Button theme="ghost" className={styles["btn-animated"]} onClick={() => changeDate("month", 1)}>
          <MdKeyboardArrowRight />
        </Button>
        <Button theme="ghost" className={styles["btn-animated"]} onClick={() => changeDate("year", 1)}>
          <MdKeyboardDoubleArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
