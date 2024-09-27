'use client';

import React from 'react';
import RecurrenceOptions from '../RecurrenceOptions';
import CustomRecurrence from '../CustomRecurrence';
import CalendarPreview from '../CalendarPreview';

import useRecurrenceStore from '../../store/RecurrenceStore';

const DatePicker = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useRecurrenceStore();

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);

  
    if (endDate && selectedStartDate > endDate) {
      setEndDate(''); 
    }
  };


  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;
    if (startDate && selectedEndDate < startDate) {
      alert('End date cannot be earlier than the start date.');
    } else {
      setEndDate(selectedEndDate);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Recurring Date Picker
      </h2>
      <div className="mb-4">
        <label className="block text-gray-600">Start Date</label>
        <input
          type="date"
          value={startDate || ''}
          onChange={handleStartDateChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600">End Date (optional)</label>
        <input
          type="date"
          value={endDate || ''}
          onChange={handleEndDateChange}
          className="w-full p-2 border border-gray-300 rounded"
          min={startDate || undefined} 
        />
      </div>
      <RecurrenceOptions />
      <CustomRecurrence />
      <CalendarPreview />
    </div>
  );
};

export default DatePicker;
