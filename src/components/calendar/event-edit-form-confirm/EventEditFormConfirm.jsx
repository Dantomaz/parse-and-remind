import { useContext } from "react";
import { useForm } from "react-hook-form";
import Input from "../../input/Input";
import { CalendarContext } from "../CalendarProvider";
import styles from "./EventEditFormConfirm.module.scss";

const EventEditFormConfirm = ({ title, onSubmit, form }) => {
  const { countEventsWithSummary } = useContext(CalendarContext);
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      applyToAll: "true",
    },
  });

  const applyToAll = watch("applyToAll");

  return (
    <div className={styles["flex-container"]}>
      <p>Do you want to apply the changes to all calendar events with name:</p>
      <p>
        <span>{title}</span>
      </p>
      <div className={styles["flex-row"]}>
        <p>
          It will affect <span>{countEventsWithSummary(title)}</span> events.
        </p>
        <form id={form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["flex-row"]}>
            <Input id="yes" type="radio" label="Yes" value="true" checked={applyToAll === "true"} register={{ ...register("applyToAll") }} />
            <Input id="no" type="radio" label="No" value="false" checked={applyToAll === "false"} register={{ ...register("applyToAll") }} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventEditFormConfirm;
