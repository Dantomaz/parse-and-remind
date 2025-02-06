import { useLocation } from "react-router-dom";
import Calendar from "../../components/calendar/Calendar";
import CalendarProvider from "../../components/calendar/CalendarProvider";

const CalendarPage = () => {
  const { state } = useLocation();
  const eventsToAdd = state?.data || [];

  return (
    <CalendarProvider eventsToAdd={eventsToAdd}>
      <Calendar />
    </CalendarProvider>
  );
};

export default CalendarPage;
