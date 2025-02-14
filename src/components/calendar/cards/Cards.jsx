import { useContext } from "react";
import { CalendarContext } from "../CalendarProvider";
import EventItem from "../event-item/EventItem";
import styles from "./Cards.module.scss";

const Card = ({ day, monthOffset, events }) => {
  return (
    <div className={`${styles["card"]} ${monthOffset && styles["faded"]}`}>
      <div className={styles["day-number"]}>{day}</div>
      {!monthOffset && events?.map((event) => <EventItem event={event} />)}
    </div>
  );
};

const Cards = () => {
  const { currentDate, eventsForCurrentMonth } = useContext(CalendarContext);

  return (
    <div className={styles["cards"]}>
      {currentDate.days.map(({ day, monthOffset }, index) => (
        <Card key={index} day={day} monthOffset={monthOffset} events={eventsForCurrentMonth?.get(day)} />
      ))}
    </div>
  );
};

export default Cards;
