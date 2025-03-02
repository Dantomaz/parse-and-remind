import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../button/Button";
import Modal from "../../modal/Modal";
import { CalendarContext } from "../CalendarProvider";
import styles from "./Footer.module.scss";

const Footer = () => {
  const navigate = useNavigate();
  const { postEvents } = useContext(CalendarContext);
  const [isModalOpened, setModalOpened] = useState(false);

  const hideModal = () => setModalOpened(false);
  const showModal = () => setModalOpened(true);

  const handleOk = async () => {
    hideModal();
    const responseArray = await postEvents();
    if (responseArray) {
      alertResult(responseArray);
    }
  };

  const alertResult = (responseArray) => {
    const errors = responseArray?.filter(({ response }) => response?.error?.errors?.length > 0);

    if (errors?.length === 0) {
      alert("All events created successfully!");
      return;
    }

    const errorsToDisplay = errors?.map(formatMessage)?.join("\n");

    const alertMessage = "These events returned errors:\n\n" + errorsToDisplay;

    console.error(alertMessage);
    alert(alertMessage);
  };

  const formatMessage = (error, index) => {
    return `${index + 1}.\n- summary: ${error.event.summary}\n- start_date: ${error.event.start.date}\n- error: ${
      error.response.error.message
    }\n- code: ${error.response.error.code}\n`;
  };

  return (
    <div className={styles["container"]}>
      <Button className={styles["button"]} onClick={() => navigate("/")}>
        Back
      </Button>
      <Button className={styles["button"]} onClick={showModal}>
        Create events
      </Button>
      <Modal show={isModalOpened} onCancel={hideModal} cancelText={"No"} onOk={handleOk} okText={"Yes"}>
        <div className={styles["modal-content"]}>
          <h2>Confirmation</h2>
          <p>All events shown will be created in your primary google calendar. This action cannot be undone. Proceed?</p>
        </div>
      </Modal>
    </div>
  );
};

export default Footer;
