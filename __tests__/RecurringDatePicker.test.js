import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatePicker from '../components/DatePicker';
import RecurrenceOptions from '../components/RecurrenceOptions';
import CustomRecurrence from '../components/CustomRecurrence';
import CalendarPreview from '../components/CalendarPreview';
import useRecurrenceStore from '../store/RecurrenceStore';

// Mock the store
jest.mock('../store/RecurrenceStore');

// DatePicker tests
describe('DatePicker', () => {
    beforeEach(() => {
      useRecurrenceStore.mockReturnValue({
        startDate: '',
        setStartDate: jest.fn(),
        endDate: '',
        setEndDate: jest.fn(),
      });
    });
  
    test('renders start and end date inputs', () => {
      render(<DatePicker />);
      expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
    });
  
    test('calls setStartDate when start date is changed', () => {
      const setStartDate = jest.fn();
      useRecurrenceStore.mockReturnValue({ startDate: '', setStartDate, endDate: '', setEndDate: jest.fn() });
      
      render(<DatePicker />);
      fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2023-09-01' } });
      expect(setStartDate).toHaveBeenCalledWith('2023-09-01');
    });
  
    test('calls setEndDate when end date is changed', () => {
      const setEndDate = jest.fn();
      useRecurrenceStore.mockReturnValue({ startDate: '2023-09-01', setStartDate: jest.fn(), endDate: '', setEndDate });
      
      render(<DatePicker />);
      fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2023-09-30' } });
      expect(setEndDate).toHaveBeenCalledWith('2023-09-30');
    });
  });
  
  // RecurrenceOptions tests
  describe('RecurrenceOptions', () => {
    test('renders recurrence type select', () => {
      useRecurrenceStore.mockReturnValue({
        recurrenceType: 'daily',
        setRecurrenceType: jest.fn(),
      });
  
      render(<RecurrenceOptions />);
      expect(screen.getByLabelText(/Recurrence Type/i)).toBeInTheDocument();
    });
  
    test('calls setRecurrenceType when option is changed', () => {
      const setRecurrenceType = jest.fn();
      useRecurrenceStore.mockReturnValue({
        recurrenceType: 'daily',
        setRecurrenceType,
      });
  
      render(<RecurrenceOptions />);
      fireEvent.change(screen.getByLabelText(/Recurrence Type/i), { target: { value: 'weekly' } });
      expect(setRecurrenceType).toHaveBeenCalledWith('weekly');
    });
  });
  
  // CustomRecurrence tests
  describe('CustomRecurrence', () => {
    test('renders interval input', () => {
      useRecurrenceStore.mockReturnValue({
        recurrenceType: 'daily',
        selectedDays: [],
        toggleSelectedDay: jest.fn(),
      });
  
      render(<CustomRecurrence />);
      expect(screen.getByLabelText(/Every/i)).toBeInTheDocument();
    });
  
    test('renders weekday buttons when recurrence type is weekly', () => {
      useRecurrenceStore.mockReturnValue({
        recurrenceType: 'weekly',
        selectedDays: [],
        toggleSelectedDay: jest.fn(),
      });
  
      render(<CustomRecurrence />);
      expect(screen.getByText(/Monday/i)).toBeInTheDocument();
      expect(screen.getByText(/Sunday/i)).toBeInTheDocument();
    });
  });
  
  // CalendarPreview tests
  describe('CalendarPreview', () => {
    test('renders no dates message when no dates are selected', () => {
      useRecurrenceStore.mockReturnValue({
        startDate: null,
        endDate: null,
        recurrenceType: 'daily',
        selectedDays: [],
      });
  
      render(<CalendarPreview />);
      expect(screen.getByText(/No dates selected/i)).toBeInTheDocument();
    });
  
    test('renders recurring dates when start date is set', () => {
      useRecurrenceStore.mockReturnValue({
        startDate: '2023-09-01',
        endDate: null,
        recurrenceType: 'daily',
        selectedDays: [],
      });
  
      render(<CalendarPreview />);
      expect(screen.getByText(/09\/01\/2023/)).toBeInTheDocument();
    });
  });