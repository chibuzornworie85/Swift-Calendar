import React, { createContext, useContext, useState } from 'react';
import { NotesType, CalendarContextType } from '../types/calendar.types';

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<NotesType>(() => {
    const saved = localStorage.getItem('calendar-notes');
    return saved ? JSON.parse(saved) : {};
  });

  const setNote = (date: string, note: string) => {
    setNotes((prev) => {
      const updated = { ...prev, [date]: note };
      localStorage.setItem('calendar-notes', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <CalendarContext.Provider value={{ notes, setNote }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) throw new Error('useCalendar must be used within CalendarProvider');
  return context;
};
