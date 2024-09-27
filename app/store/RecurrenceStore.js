import { create } from 'zustand';

const useRecurrenceStore = create((set) => ({
  startDate: null,
  endDate: null,
  recurrenceType: 'daily',
  customRecurrence: {},
  selectedDays: [],

  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setRecurrenceType: (type) => set({ recurrenceType: type }),
  setCustomRecurrence: (custom) => set({ customRecurrence: custom }),
  toggleSelectedDay: (day) =>
    set((state) => {
      const newSelectedDays = state.selectedDays.includes(day)
        ? state.selectedDays.filter((d) => d !== day)
        : [...state.selectedDays, day];
      return { selectedDays: newSelectedDays };
    }),
}));

export default useRecurrenceStore;
