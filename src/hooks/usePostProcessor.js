const REMINDER_TIME_IN_MINUTES = 60 * 8;

const usePostProcessor = () => {
  const isNotPassed = (date) => {
    return new Date(date).getTime() > new Date().getTime();
  };

  const extractDate = (string) => {
    return string.replace(/.*?(\d{4}-\d{2}-\d{2}).*/g, "$1");
  };

  const containsDate = (string) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(string);
  };

  const inChronologicalOrder = (older, newer) => {
    return new Date(older).getTime() - new Date(newer).getTime();
  };

  const mapDateToEvent = (date, title) => {
    return {
      summary: title,
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
            minutes: REMINDER_TIME_IN_MINUTES,
          },
          {
            method: "email",
            minutes: REMINDER_TIME_IN_MINUTES,
          },
        ],
      },
    };
  };

  const processFiles = (files) => {
    return files
      .map(processFile) // process each file separately
      .flatMap((eventList) => eventList) // flatten into one array
      .sort((event1, event2) => inChronologicalOrder(event1.start.date, event2.start.date)); // sort chronologically by date
  };

  const processFile = (text) => {
    const lines = text.split(/\r?\n/); // split the text by end of each line (in some cases it's '\r\n', in others it's '\n')
    const header = lines[0];

    const events = lines
      .map(extractDate) // remove unnecessary characters, leaving only the date (or empty string if no date found)
      .filter(containsDate) // keep lines that contain a date
      .filter(isNotPassed) // keep dates that have not yet passed
      .map((date) => mapDateToEvent(date, header));

    return events;
  };

  return { processFiles };
};

export default usePostProcessor;
