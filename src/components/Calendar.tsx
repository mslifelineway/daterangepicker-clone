import React from "react";
import "./calendar.css";
import { CalendarData, ECALENDARIDs } from "../types";
import { months } from "../constants";
import { compareTwoDates, isWeekend } from "../helpers";

interface RenderDateButtonProps {
  text: number;
  isDisabled: boolean;
  type?: number;
}

export type CalendarProps = CalendarData & {
  id: ECALENDARIDs;
  handleDateSelect: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: ECALENDARIDs
  ) => void;
  handleNextPrev: (isNext?: boolean) => void;
  startDate: Date | null;
  endDate: Date | null;
};

const Calendar = (props: CalendarProps) => {
  const {
    id,
    handleDateSelect,
    handleNextPrev,
    calendarDate,
    lastDateOfPrevMonth,
    currentDates,
    datesOfFirstWeekOfNextMonth,
    todayDate,
    startDate,
    endDate,
  } = props;
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const selectedMonth = months[month];
  const selectedYear = year;

  const RenderDateButton = ({
    text,
    type,
    isDisabled,
  }: RenderDateButtonProps) => {
    const currentDate = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth(),
      text
    );
    const isWeekendDay = isWeekend(currentDate);
    const disabled = isDisabled || isWeekendDay;

    const newTodayDate = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      text
    );
    const isToday = compareTwoDates(newTodayDate, calendarDate) === 0;
    let isSelected = false;

    if (startDate)
      isSelected = isSelected || compareTwoDates(startDate, currentDate) === 0;

    if (endDate)
      isSelected = isSelected || compareTwoDates(endDate, currentDate) === 0;

    let isInRange =
      startDate &&
      compareTwoDates(currentDate, startDate) === 1 &&
      endDate &&
      compareTwoDates(currentDate, endDate) === -1;

    let className = " ";

    if (isToday && !type && !disabled) className += " today";
    if (isSelected && !type && !disabled) className += " selected";
    if (isInRange) className += " in-range";

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      handleDateSelect(e, id);
    };

    return (
      <button
        className={className}
        disabled={disabled}
        onClick={!type || !disabled || !isWeekendDay ? onClick : undefined}
      >
        {text}
      </button>
    );
  };

  return (
    <div className="calendar">
      <div className="calendar__selected-date">
        <button className="calendar__btn-prev" onClick={() => handleNextPrev()}>
          &lsaquo;
        </button>
        <div className="calendar__selected-yr_month">
          {selectedMonth}, {selectedYear}
        </div>
        <button
          className="calendar__btn-next"
          onClick={() => handleNextPrev(true)}
        >
          &rsaquo;
        </button>
      </div>
      <div className="calendar__days">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>
      <div className="calendar__dates">
        {lastDateOfPrevMonth.map((dateVal) => (
          <RenderDateButton text={dateVal} isDisabled={true} type={-1} />
        ))}
        {currentDates.map((dateVal) => (
          <RenderDateButton text={dateVal} isDisabled={false} />
        ))}
        {datesOfFirstWeekOfNextMonth.map((dateVal) => (
          <RenderDateButton text={dateVal} isDisabled={true} type={1} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
