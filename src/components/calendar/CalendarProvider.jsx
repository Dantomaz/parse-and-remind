import { createContext, useEffect, useState } from "react";
import { dateMatches, getCalendarDays } from "../../utils";

export const CalendarContext = createContext();

const CalendarProvider = ({ children, eventsToAdd = {} }) => {
  const [initialDate, setInitialDate] = useState(); // allows resetting to the default calendar page
  const [currentDate, setCurrentDate] = useState(); // information regarding current calendar page
  const [eventsForCurrentMonth, setEventsForCurrentMonth] = useState(); // events for display in the current calendar page

  useEffect(() => {
    const referenceDate = eventsToAdd.length === 0 ? new Date() : new Date(eventsToAdd[0].start.date);
    const referenceYear = referenceDate.getFullYear();
    const referenceMonth = referenceDate.getMonth() + 1;
    const referenceDays = getCalendarDays(referenceYear, referenceMonth);

    const init = {
      year: referenceYear,
      month: referenceMonth,
      days: referenceDays,
    };

    setInitialDate(init);
    setCurrentDate(init);
  }, [eventsToAdd]);

  // refresh events to be displayed in the current calendar page every time the calendar page changes
  useEffect(() => {
    if (!currentDate) {
      return;
    }

    findEventsForCurrentDate();
  }, [currentDate]); // eslint-disable-line react-hooks/exhaustive-deps

  function findEventsForCurrentDate() {
    const eventsForThisMonth = new Map();

    eventsToAdd
      .filter((event) => dateMatches(event.start.date, currentDate.year, currentDate.month)) // only keep events that can be displayed in current calendar page
      .forEach((event) => eventsForThisMonth.set(Number(event.start.date.slice(-2)), event)); // add to map with day numbers as keys for easy access

    setEventsForCurrentMonth(eventsForThisMonth);
  }

  const changeDate = (type, amount) => {
    const calculateNewDate = (previousDate) => {
      const updated = { ...previousDate, [type]: previousDate[type] + amount };

      // perform a correction if month has changed
      if (type === "month") {
        updated.year += Math.floor((updated.month - 1) / 12); // -1 or +1 year if month falls out of 1-12 range
        updated.month = ((((updated.month - 1) % 12) + 12) % 12) + 1; // normalize the month back to 1-12 range if needed
      }

      updated.days = getCalendarDays(updated.year, updated.month);
      return updated;
    };

    setCurrentDate(calculateNewDate);
  };

  const resetDate = () => {
    setCurrentDate(initialDate);
  };

  return (
    <CalendarContext.Provider value={{ currentDate, changeDate, resetDate, eventsForCurrentMonth, eventsToAdd }}>{children}</CalendarContext.Provider>
  );
};

export default CalendarProvider;
