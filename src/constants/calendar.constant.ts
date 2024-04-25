import { EPredefinedDates, IPerdefinedDate } from "../types";

export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const predefinedOptions: IPerdefinedDate[] = [
  {
    text: "Today",
    predefinedOption: EPredefinedDates.TODAY,
  },
  {
    text: "Yesterday",
    predefinedOption: EPredefinedDates.YESTERDAY,
  },
  {
    text: "This week",
    predefinedOption: EPredefinedDates.THIS_WEEK,
  },
  // {
  //   text: "Last 7 days",
  //   predefinedOption: EPredefinedDates.LAST_7_DAYS,
  // },
  // {
  //   text: "Last 30 days",
  //   predefinedOption: EPredefinedDates.LAST_30_DAYS,
  // },
  // {
  //   text: "This month",
  //   predefinedOption: EPredefinedDates.THIS_MONTH,
  // },
  // {
  //   text: "Last month",
  //   predefinedOption: EPredefinedDates.LAST_MONTH,
  // },
  // {
  //   text: "This year",
  //   predefinedOption: EPredefinedDates.THIS_YEAR,
  // },
  // {
  //   text: "Last year",
  //   predefinedOption: EPredefinedDates.LAST_YEAR,
  // },
];
