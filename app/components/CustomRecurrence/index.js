'use client';

import useRecurrenceStore from '../../store/RecurrenceStore';

import { useState } from 'react';

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const CustomRecurrence = () => {
  const [interval, setInterval] = useState(1);
  const recurrenceType = useRecurrenceStore((state) => state.recurrenceType);
  const selectedDays = useRecurrenceStore((state) => state.selectedDays);
  const toggleSelectedDay = useRecurrenceStore(
    (state) => state.toggleSelectedDay
  );
  const renderWeeklyOptions = () => (
    <div className="mt-4">
      <label className="block text-gray-600">Select Days</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {weekdays.map((day, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 border ${
              selectedDays.includes(idx)
                ? 'bg-blue-500 text-white'
                : 'border-gray-300'
            }`}
            onClick={() => toggleSelectedDay(idx)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mb-4">
      <label className="block text-gray-600">Every</label>
      <input
        type="number"
        value={interval}
        onChange={(e) => setInterval(e.target.value)}
        className="w-20 p-2 border border-gray-300 rounded"
      />{' '}
      {recurrenceType === 'daily' && 'days'}
      {recurrenceType === 'weekly' && 'weeks'}
      {recurrenceType === 'monthly' && 'months'}
      {recurrenceType === 'yearly' && 'years'}
      {recurrenceType === 'weekly' && renderWeeklyOptions()}
    </div>
  );
};

export default CustomRecurrence;
