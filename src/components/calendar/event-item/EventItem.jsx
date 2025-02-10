import { useContext, useState } from "react";
import { transformReminderTimeUnitsToMinutes } from "../../../api/googleCalendarApi";
import Button from "../../button/Button";
import Modal from "../../modal/Modal";
import { CalendarContext } from "../CalendarProvider";
import EventEditFormConfirm from "../event-edit-form-confirm/EventEditFormConfirm";
import EventEditForm from "../event-edit-form/EventEditForm";
import styles from "./EventItem.module.scss";

function EventItem({ event }) {
  const { updateEventBySummaryAndDate, updateAllEventsBySummary } = useContext(CalendarContext);
  const [newEvent, setNewEvent] = useState();
  const [isModalOpened, setModalOpened] = useState(false);
  const [step, setStep] = useState(1);

  const steps = {
    1: {
      okText: "Save",
      formId: "details-form",
    },
    2: {
      okText: "Confirm",
      formId: "confirm-form",
    },
  };

  const showModal = () => setModalOpened(true);
  const hideModal = () => {
    setStep(1);
    setModalOpened(false);
  };

  const onSubmit = (formData) => {
    setNewEvent(transformReminderTimeUnitsToMinutes(formData));
    setStep(2);
  };

  const confirm = (formData) => {
    hideModal();

    if (formData.applyToAll === "true") {
      updateAllEventsBySummary(event.summary, newEvent);
    } else {
      updateEventBySummaryAndDate(event.summary, event.start.date, event.end.date, newEvent);
    }
  };

  return (
    <>
      {event && (
        <Button className={styles["event-item"]} overrideClass={true} onClick={showModal}>
          {event.summary}
        </Button>
      )}
      <Modal show={isModalOpened} onCancel={hideModal} okText={steps[step].okText} form={steps[step].formId}>
        <div className={styles["modal-content"]}>
          <h2>Event Details</h2>
          {step === 1 ? (
            <EventEditForm event={event} onSubmit={onSubmit} form={steps[1].formId} />
          ) : (
            <EventEditFormConfirm title={event.summary} onSubmit={confirm} form={steps[2].formId} />
          )}
        </div>
      </Modal>
    </>
  );
}

export default EventItem;
