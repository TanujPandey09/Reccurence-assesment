'use client';

import useRecurrenceStore from '../../store/RecurrenceStore';

const RecurrenceOptions = () => {
  const recurrenceType = useRecurrenceStore((state) => state.recurrenceType);
  const setRecurrenceType = useRecurrenceStore(
    (state) => state.setRecurrenceType
  );

  return (
    <div className="mb-4">
      <label className="block text-gray-600">Recurrence Type</label>
      <select
        value={recurrenceType}
        onChange={(e) => setRecurrenceType(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
};

export default RecurrenceOptions;
