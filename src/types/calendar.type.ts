export interface CalendarData {
  calendarDate: Date;
  lastDateOfPrevMonth: number[];
  currentDates: number[];
  datesOfFirstWeekOfNextMonth: number[];
  todayDate: Date;
}

export enum ECALENDARIDs {
  FIRST = "FIRST",
  SECOND = "SECOND",
}

export interface IDateRangePickerData {
  startDate: Date | null;
  endDate: Date | null;
  datesInRange: Date[];
}

export enum EPredefinedDates {
  NONE = "",
  TODAY = "TODAY",
  YESTERDAY = "YESTERDAY",
  THIS_WEEK = "THIS_WEEK",
  LAST_7_DAYS = "LAST_7_DAYS",
  LAST_30_DAYS = "LAST_30_DAYS",
  THIS_MONTH = "THIS_MONTH",
  LAST_MONTH = "LAST_MONTH",
  THIS_YEAR = "THIS_YEAR",
  LAST_YEAR = "LAST_YEAR",
}

export interface IPerdefinedDate {
  text: string;
  predefinedOption: EPredefinedDates;
}
