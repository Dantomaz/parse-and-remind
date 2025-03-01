export const getCalendarScope = () => {
  return "email profile openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar";
};

export const mapDateToEvent = (date, title) => {
  const T_MINUS_IN_MINUTES = 60 * 9; // t- 9 hours from midnight, which is 3pm

  return {
    summary: title,
    colorId: 8, // gray event color
    start: {
      date: date,
    },
    end: {
      date: date,
    },
    reminders: {
      useDefault: false,
      overrides: [
        {
          method: "popup",
          minutes: T_MINUS_IN_MINUTES,
        },
        {
          method: "email",
          minutes: T_MINUS_IN_MINUTES,
        },
      ],
    },
  };
};

// for user's convenience
export const transformReminderMinutesToDifferentUnits = (event) => {
  const createReminderObjectForDisplay = (reminder) => {
    const minutes = reminder.minutes;
    let time;
    let units;

    const HOUR_IN_MINUTES = 60;
    if (minutes >= HOUR_IN_MINUTES && minutes % HOUR_IN_MINUTES === 0) {
      time = minutes / HOUR_IN_MINUTES;
      units = "hours";
    }

    const DAY_IN_MINUTES = 60 * 24;
    if (minutes >= DAY_IN_MINUTES && minutes % DAY_IN_MINUTES === 0) {
      time = minutes / DAY_IN_MINUTES;
      units = "days";
    }

    const WEEK_IN_MINUTES = 60 * 24 * 7;
    if (minutes >= WEEK_IN_MINUTES && minutes % WEEK_IN_MINUTES === 0) {
      time = minutes / WEEK_IN_MINUTES;
      units = "weeks";
    }

    return {
      method: reminder.method,
      time,
      units,
    };
  };

  return {
    ...event,
    reminders: {
      useDefault: event.reminders.useDefault,
      overrides: event.reminders.overrides?.map(createReminderObjectForDisplay),
    },
  };
};

// go back to format needed for google calendar API
export const transformReminderTimeUnitsToMinutes = (event) => {
  const createReminderObjectForAPI = (reminder) => {
    let minutes;

    if (reminder.units === "weeks") {
      const WEEK_IN_MINUTES = 60 * 24 * 7;
      minutes = reminder.time * WEEK_IN_MINUTES;
    }

    if (reminder.units === "days") {
      const DAY_IN_MINUTES = 60 * 24;
      minutes = reminder.time * DAY_IN_MINUTES;
    }

    if (reminder.units === "hours") {
      const HOUR_IN_MINUTES = 60;
      minutes = reminder.time * HOUR_IN_MINUTES;
    }

    return {
      method: reminder.method,
      minutes,
    };
  };

  const isDefaultReminderSet = event.reminders.useDefault;

  return {
    ...event,
    reminders: {
      useDefault: isDefaultReminderSet,
      ...(!isDefaultReminderSet && { overrides: event.reminders.overrides?.map(createReminderObjectForAPI) }),
    },
  };
};

export const insertEvent = async (event, token) => {
  const apiResponse = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: JSON.stringify(event),
  });

  const response = await apiResponse.json();

  return { event, response };
};
