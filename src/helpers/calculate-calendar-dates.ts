export const getLastDatesOfPrevMonth = (
  year: number,
  month: number
): number[] => {
  const lastDateOfPrevMonth = new Date(year, month, 0);
  const prevDates: number[] = [];
  for (let i = 0; i <= lastDateOfPrevMonth.getDay(); i++) {
    prevDates.push(
      lastDateOfPrevMonth.getDate() - lastDateOfPrevMonth.getDay() + i
    );
  }
  return prevDates;
};

export const getLastDatesOfCurrentMonth = (
  year: number,
  month: number
): number[] => {
  const lastDateOfCurrentMonth = new Date(year, month + 1, 0);
  const currentDates: number[] = [];
  for (let i = 1; i <= lastDateOfCurrentMonth.getDate(); i++) {
    currentDates.push(i);
  }
  return currentDates;
};

export const getDatesOfFirstWeekOfNextMonth = (
  currentDatesCount: number
): number[] => {
  const totalDatesInCalendar = 7 * 6; //7- days * 6 - rows

  const nextWeekDates: number[] = [];
  for (let i = 0; i < totalDatesInCalendar - currentDatesCount; i++) {
    nextWeekDates.push(i + 1);
  }
  return nextWeekDates;
};

export const compareTwoDates = (firstDate: Date, secondDate: Date): number => {
  const yearDiff = firstDate.getFullYear() - secondDate.getFullYear();
  const monthDiff = firstDate.getMonth() - secondDate.getMonth();
  const dateDiff = firstDate.getDate() - secondDate.getDate();

  //0 = both are equal
  //1 = first date is greater
  //-1 = first date is lesser

  if (yearDiff > 0) return 1;
  if (yearDiff < 0) return -1;

  if (monthDiff > 0) return 1;
  if (monthDiff < 0) return -1;

  if (dateDiff > 0) return 1;
  if (dateDiff < 0) return -1;

  return 0;
};

export const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  let currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() + 1);

  while (currentDate < endDate) {
    if (!isWeekend(currentDate)) {
      dates.push(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        )
      );
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const isWeekend = (currentDate: Date) => {
  return [0, 6].includes(currentDate.getDay());
};

export const prepareSelectedDateRange = (
  startDate: Date | null,
  endDate: Date | null
) => {
  let startDateStr = "yyyy-MM-dd";
  let endDateStr = "yyyy-MM-dd";

  if (startDate) {
    const month = startDate.getMonth() + 1;
    startDateStr = `${startDate.getFullYear()}-${
      month < 9 ? "0" + month : month
    }-${
      startDate.getDate() < 9 ? "0" + startDate.getDate() : startDate.getDate()
    }`;
  }

  if (endDate) {
    const month = endDate.getMonth() + 1;
    endDateStr = `${endDate.getFullYear()}-${month < 9 ? "0" + month : month}-${
      endDate.getDate() < 9 ? "0" + endDate.getDate() : endDate.getDate()
    }`;
  }

  return `${startDateStr} ~ ${endDateStr}`;
};

export const getTodayDate = () => {
  return new Date();
};

export const getNextMonthDayFromCurrent = (currentDate: Date) => {
  const newDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  );
  return newDate;
};

export const getPrevMonthDayFromCurrent = (currentDate: Date) => {
  const newDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    currentDate.getDate()
  );
  return newDate;
};

export const getThisWeekDates = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const currentDay = currentDate.getDay();

  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - currentDay + 1);

  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + (5 - currentDay));

  return { startDate, endDate };
};
