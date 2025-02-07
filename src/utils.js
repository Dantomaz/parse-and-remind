import { ALLOWED_FILE_TYPES } from "./constants";

export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const getCalendarDays = (year, month) => {
  const days = [];

  // get the day of the week of the first day of the current month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentMonthFirstDay = new Date(year, month - 1, 1).getDay();

  // determine how many days to fill from the previous month
  const prevDaysToFill = currentMonthFirstDay === 0 ? 6 : currentMonthFirstDay - 1; // Convert Sunday (0) to 6

  // get previous month's last day
  const prevMonthLastDay = new Date(year, month - 1, 0).getDate(); // day 0 means last day of the month before the given month

  // fill previous month's days
  for (let i = prevDaysToFill; i > 0; i--) {
    days.push({
      day: prevMonthLastDay - i + 1,
      monthOffset: -1,
    });
  }

  const currentMonthLastDay = new Date(year, month, 0).getDate();

  // fill current month's days
  for (let i = 1; i <= currentMonthLastDay; i++) {
    days.push({ day: i, monthOffset: 0 });
  }

  const CALENDAR_COLUMNS = 7;
  const CALENDAR_ROWS = 6;
  const nextMonthToFill = CALENDAR_COLUMNS * CALENDAR_ROWS - prevDaysToFill - currentMonthLastDay;

  // fill next month's days
  for (let i = 1; i <= nextMonthToFill; i++) {
    days.push({ day: i, monthOffset: 1 });
  }

  return days;
};

export const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString("eng", { month: "long" });
};

// matches date by year and month (any day)
export const dateMatches = (date, year, month) => {
  const monthPadded = month.toString().padStart(2, "0");
  const regex = new RegExp(`^${year}-${monthPadded}-\\d{2}$`);
  return regex.test(date);
};

// returns array: [0] -> file name, [1] -> file extension
export const splitFileExtension = (fileName) => {
  const splitFileName = fileName.split(".");
  const extension = splitFileName.pop();
  return [splitFileName.join("."), extension];
};

// returns array
export const getAllowedFileExtentions = () => {
  return ALLOWED_FILE_TYPES.map((element) => element.extension);
};
