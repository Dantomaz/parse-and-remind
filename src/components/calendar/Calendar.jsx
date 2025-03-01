import { useContext } from "react";
import styles from "./Calendar.module.scss";
import { CalendarContext } from "./CalendarProvider";
import Cards from "./cards/Cards";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Navbar from "./navbar/Navbar";

const Calendar = () => {
  const { currentDate } = useContext(CalendarContext);

  return (
    <div className={styles["container"]}>
      {currentDate && (
        <main className={styles["calendar"]}>
          <Navbar />
          <Header />
          <Cards />
          <Footer />
        </main>
      )}
    </div>
  );
};

export default Calendar;
