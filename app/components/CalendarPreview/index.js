'use client';

import React, { useMemo } from 'react';
import {
  format,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isBefore,
  isAfter,
} from 'date-fns';
import useRecurrenceStore from '../../store/RecurrenceStore';

const CalendarPreview = () => {
  const { startDate, endDate, recurrenceType, selectedDays } =
    useRecurrenceStore();
  const interval = 1; // From the CustomRecurrence input field

  const recurringDates = useMemo(() => {
    if (!startDate) return [];

    let currentDate = new Date(startDate);
    const endDateObj = endDate ? new Date(endDate) : addYears(currentDate, 1); // Limit to 1 year if no end date
    let dates = [];

    while (isBefore(currentDate, endDateObj) && dates.length < 10) {
      if (
        recurrenceType === 'daily' ||
        (recurrenceType === 'weekly' &&
          selectedDays.includes(currentDate.getDay())) ||
        recurrenceType === 'monthly' ||
        recurrenceType === 'yearly'
      ) {
        dates.push(new Date(currentDate));
      }

      switch (recurrenceType) {
        case 'daily':
          currentDate = addDays(currentDate, interval);
          break;
        case 'weekly':
          currentDate = addDays(currentDate, 1);
          break;
        case 'monthly':
          currentDate = addMonths(currentDate, interval);
          break;
        case 'yearly':
          currentDate = addYears(currentDate, interval);
          break;
      }
    }

    return dates;
  }, [startDate, endDate, recurrenceType, selectedDays, interval]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Recurring Dates Preview:</h3>
      {recurringDates.length === 0 ? (
        <p className="text-gray-500">No dates selected.</p>
      ) : (
        <ul>
          {recurringDates.map((date, idx) => (
            <li key={idx} className="text-gray-700">
              {format(date, 'MM/dd/yyyy')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalendarPreview;
