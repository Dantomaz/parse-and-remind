import { useContext } from "react";
import styles from "./Calendar.module.scss";
import { CalendarContext } from "./CalendarProvider";
import Cards from "./cards/Cards";
import Header from "./header/Header";
import Navbar from "./navbar/Navbar";

const Calendar = () => {
  const { currentDate } = useContext(CalendarContext);

  return (
    <div className={styles["container"]}>
      {currentDate && (
        <div className={styles["calendar"]}>
          <Navbar />
          <Header />
          <Cards />
        </div>
      )}
    </div>
  );
};

export default Calendar;
