import { useContext } from "react";
import { CalendarContext } from "../CalendarProvider";
import EventItem from "../event-item/EventItem";
import styles from "./Cards.module.scss";

const Card = ({ day, monthOffset, event }) => {
  return (
    <div className={`${styles["card"]} ${monthOffset && styles["faded"]}`}>
      <div className={styles["day-number"]}>{day}</div>
      {!monthOffset && <EventItem event={event} />}
    </div>
  );
};

const Cards = () => {
  const { currentDate, eventsForCurrentMonth } = useContext(CalendarContext);

  return (
    <div className={styles["cards"]}>
      {currentDate.days.map(({ day, monthOffset }, index) => (
        <Card key={index} day={day} monthOffset={monthOffset} event={eventsForCurrentMonth?.get(day)} />
      ))}
    </div>
  );
};

export default Cards;
