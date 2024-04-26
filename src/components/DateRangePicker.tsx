import React, { useCallback, useEffect, useState } from "react";
import "./date-range-picker.css";
import Calendar, { CalendarProps } from "./Calendar";
import {
  CalendarData,
  IDateRangePickerData,
  IPerdefinedDate,
  ECALENDARIDs,
  EPredefinedDates,
} from "../types";
import {
  compareTwoDates,
  getDatesInRange,
  getDatesOfFirstWeekOfNextMonth,
  getLastDatesOfCurrentMonth,
  getLastDatesOfPrevMonth,
  getNextMonthDayFromCurrent,
  getPrevMonthDayFromCurrent,
  getThisWeekDates,
  getTodayDate,
  prepareSelectedDateRange,
} from "../helpers";
import { predefinedOptions } from "../constants";

const firstCalendarDefaultData: CalendarData = {
  calendarDate: new Date(),
  lastDateOfPrevMonth: [],
  currentDates: [],
  datesOfFirstWeekOfNextMonth: [],
  todayDate: new Date(),
};
const secondCalendarDefaultData: CalendarData = {
  calendarDate: new Date(),
  lastDateOfPrevMonth: [],
  currentDates: [],
  datesOfFirstWeekOfNextMonth: [],
  todayDate: new Date(),
};

const initialDateRangePickerData: IDateRangePickerData = {
  startDate: null,
  endDate: null,
  datesInRange: [],
};

const DateRangePicker = () => {
  const [predefinedDate, setPredefinedDate] = useState<EPredefinedDates>(
    EPredefinedDates.NONE
  );
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [firstCalendarData, setFirstCalendarData] = useState<CalendarData>(
    firstCalendarDefaultData
  );
  const [secondCalendarData, setSecondCalendarData] = useState<CalendarData>(
    secondCalendarDefaultData
  );
  const [dateRangePickerData, setDateRangePickerData] =
    useState<IDateRangePickerData>(initialDateRangePickerData);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const updateFirstCalendarDetails = (calendarDate: Date) => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const prevDates = getLastDatesOfPrevMonth(year, month);
    const currentDates = getLastDatesOfCurrentMonth(year, month);
    const datesOfFirstWeekOfNextMonth = getDatesOfFirstWeekOfNextMonth(
      prevDates.length + currentDates.length
    );
    setFirstCalendarData((prev) => ({
      ...prev,
      calendarDate,
      lastDateOfPrevMonth: prevDates,
      currentDates,
      datesOfFirstWeekOfNextMonth,
    }));
  };
  const updateFirstCalendarData = useCallback(() => {
    updateFirstCalendarDetails(firstCalendarData.calendarDate);
  }, []);

  const updateSecondCalendarDetails = (nextMonthDate: Date) => {
    const year = nextMonthDate.getFullYear();
    const month = nextMonthDate.getMonth();
    const prevDates = getLastDatesOfPrevMonth(year, month);
    const currentDates = getLastDatesOfCurrentMonth(year, month);
    const datesOfFirstWeekOfNextMonth = getDatesOfFirstWeekOfNextMonth(
      prevDates.length + currentDates.length
    );
    setSecondCalendarData((prev) => ({
      ...prev,
      calendarDate: nextMonthDate,
      lastDateOfPrevMonth: prevDates,
      currentDates,
      datesOfFirstWeekOfNextMonth,
    }));
  };

  const updateSecondCalendarData = useCallback(() => {
    updateSecondCalendarDetails(
      getNextMonthDayFromCurrent(firstCalendarData.calendarDate)
    );
  }, []);

  useEffect(() => {
    updateFirstCalendarData();
  }, [updateFirstCalendarData]);

  useEffect(() => {
    updateSecondCalendarData();
  }, [updateSecondCalendarData]);

  // useEffect(() => {
  //   if (startDate && endDate) {
  //     setDateRangePickerData((prev) => ({
  //       ...prev,
  //       datesInRange: getDatesInRange(startDate, endDate),
  //     }));
  //   } else {
  //     setDateRangePickerData(initialDateRangePickerData);
  //   }
  // }, [startDate, endDate]);

  const handleDateSelect = (
    e: React.MouseEvent<HTMLElement>,
    id: ECALENDARIDs
  ) => {
    const button = e.target as HTMLButtonElement;

    let prevDate: Date;
    if (id === ECALENDARIDs.FIRST) {
      prevDate = firstCalendarData.calendarDate;
    } else {
      prevDate = secondCalendarData.calendarDate;
    }

    if (prevDate) {
      const year = prevDate.getFullYear();
      const month = prevDate.getMonth();
      const newDate = new Date(year, month, parseInt(button.innerText));
      if (!startDate && !endDate) {
        setStartDate(newDate);
      } else if (startDate) {
        const diff = compareTwoDates(newDate, startDate);
        if (endDate) {
          setStartDate(newDate);
          setEndDate(null);
        } else {
          if (diff < 0) {
            setEndDate(startDate);
            setStartDate(newDate);
          } else if (diff === 1) {
            setEndDate(newDate);
          } else if (diff === 0) {
            setEndDate(null);
            setStartDate(newDate);
          }
        }
      }
    }
    setPredefinedDate(EPredefinedDates.NONE);
  };

  const handleNextPrev = (isNext?: boolean) => {
    const newDate = isNext
      ? getNextMonthDayFromCurrent(firstCalendarData.calendarDate)
      : getPrevMonthDayFromCurrent(firstCalendarData.calendarDate);
    updateFirstCalendarDetails(newDate);
    const newNextDate = getNextMonthDayFromCurrent(newDate);
    updateSecondCalendarDetails(newNextDate);
  };

  const cal1Props: CalendarProps = {
    id: ECALENDARIDs.FIRST,
    handleDateSelect,
    handleNextPrev,
    ...firstCalendarData,
    startDate,
    endDate,
  };
  const cal2Props: CalendarProps = {
    id: ECALENDARIDs.SECOND,
    handleDateSelect,
    handleNextPrev,
    ...secondCalendarData,
    startDate,
    endDate,
  };

  const hasDateRangeSelected: boolean = Boolean(startDate && endDate);

  const applyDateRange = () => {
    if (!hasDateRangeSelected) return;
    if (startDate && endDate) {
      setDateRangePickerData((prev) => ({
        ...prev,
        startDate,
        endDate,
        datesInRange: getDatesInRange(startDate, endDate),
      }));
    } else {
      setDateRangePickerData(initialDateRangePickerData);
    }
    setShowCalendar(false);
    setPredefinedDate(EPredefinedDates.NONE);
  };

  const handlePredefinedDates = useCallback(() => {
    let today = new Date();
    if (predefinedDate) {
      switch (predefinedDate) {
        case EPredefinedDates.TODAY:
          setStartDate(today);
          setEndDate(today);
          setDateRangePickerData((prev) => ({
            ...prev,
            datesInRange: [],
            startDate: today,
            endDate: today,
          }));
          break;
        case EPredefinedDates.YESTERDAY:
          today.setDate(today.getDate() - 1);
          setStartDate(today);
          setEndDate(today);
          setDateRangePickerData((prev) => ({
            ...prev,
            datesInRange: [],
            startDate: today,
            endDate: today,
          }));
          break;
        case EPredefinedDates.THIS_WEEK:
          const { startDate, endDate } = getThisWeekDates();
          setStartDate(startDate);
          setEndDate(endDate);
          setDateRangePickerData((prev) => ({
            ...prev,
            datesInRange: getDatesInRange(startDate, endDate),
            startDate: startDate,
            endDate: endDate,
          }));
          break;
      }
      setShowCalendar(false);
    }
  }, [predefinedDate]);

  useEffect(() => {
    handlePredefinedDates();
  }, [handlePredefinedDates]);

  return (
    <div>
      <div className="daterangepicker">
        <input
          type="text"
          placeholder="selected date"
          className="daterangepicker__input"
          value={prepareSelectedDateRange(
            dateRangePickerData.startDate,
            dateRangePickerData.endDate
          )}
          onFocus={() => setShowCalendar(true)}
        />
        {showCalendar && (
          <div className="datepicker__content">
            <div className="datepicker__header">
              <p>{prepareSelectedDateRange(startDate, endDate)}</p>
            </div>
            <div className="datepicker__calendar">
              <Calendar {...cal1Props} />
              <Calendar {...cal2Props} />
            </div>
            <div className="datepicker__footer">
              <div className="datepicker__predefined">
                {predefinedOptions.map((pre: IPerdefinedDate) => (
                  <button
                    key={pre.predefinedOption}
                    onClick={() => setPredefinedDate(pre.predefinedOption)}
                  >
                    {pre.text}
                  </button>
                ))}
              </div>
              <div className="datepicker__actions">
                <button
                  className="datepicker__btn--ok"
                  disabled={!hasDateRangeSelected}
                  onClick={applyDateRange}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {dateRangePickerData.datesInRange.length > 0 ? (
        <ul className="daterangepicker__selected-dates--list">
          {dateRangePickerData.datesInRange.map((d: Date, idx) => (
            <li key={idx}>{d.toDateString()}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default DateRangePicker;
