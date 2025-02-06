import Button from "../../button/Button";
import styles from "./EventItem.module.scss";

function EventItem({ event }) {
  return (
    event && (
      <Button className={styles["event-item"]} overrideClass={true}>
        {event.summary}
      </Button>
    )
  );
}

export default EventItem;
