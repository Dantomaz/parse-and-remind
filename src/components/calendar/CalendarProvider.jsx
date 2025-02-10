import { createContext, useEffect, useState } from "react";
import { dateMatches, getCalendarDays } from "../../utils";

export const CalendarContext = createContext();

const CalendarProvider = ({ children, eventsToAdd = {} }) => {
  const [events, setEvents] = useState(eventsToAdd); // save events passed to this provider
  const [initialDate, setInitialDate] = useState(); // allows resetting to the default calendar page
  const [currentDate, setCurrentDate] = useState(); // information regarding current calendar page
  const [eventsForCurrentMonth, setEventsForCurrentMonth] = useState(); // events for display in the current calendar page

  useEffect(() => {
    const referenceDate = events.length === 0 ? new Date() : new Date(events[0].start.date);
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // refresh events to be displayed in the current calendar page every time the calendar page changes or events are updated
  useEffect(() => {
    if (!currentDate) {
      return;
    }

    findEventsForCurrentDate();
  }, [currentDate, events]); // eslint-disable-line react-hooks/exhaustive-deps

  function findEventsForCurrentDate() {
    const eventsForThisMonth = new Map();

    events
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

  const countEventsWithSummary = (summary) => {
    return events.filter((event) => event.summary === summary).length;
  };

  // keeps date of the original event
  const updateEvent = (event, newEvent) => {
    return {
      ...newEvent,
      start: {
        date: event.start.date,
      },
      end: {
        date: event.end.date,
      },
    };
  };

  // targets a specific event
  const updateEventBySummaryAndDate = (summary, startDate, endDate, newEvent) => {
    const matches = (event, summary, startDate, endDate) => {
      return event.summary === summary && event.start.date === startDate && event.end.date === endDate;
    };

    setEvents((prevEvents) => prevEvents.map((event) => (matches(event, summary, startDate, endDate) ? updateEvent(event, newEvent) : event)));
  };

  // targets all events with the same summary (title)
  const updateAllEventsBySummary = (summary, newEvent) => {
    setEvents((prevEvents) => prevEvents.map((event) => (event.summary === summary ? updateEvent(event, newEvent) : event)));
  };

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        changeDate,
        resetDate,
        eventsForCurrentMonth,
        countEventsWithSummary,
        updateEventBySummaryAndDate,
        updateAllEventsBySummary,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
