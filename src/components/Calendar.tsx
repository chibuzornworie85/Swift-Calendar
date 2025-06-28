import React from 'react';
import MonthGrid from './MonthGrid';
import { addMonths, startOfMonth } from 'date-fns';

const Calendar: React.FC = () => {
  const baseDate = startOfMonth(new Date());

  return (
    <div className="calendar-container">
      {[0, 1, 2].map((offset) => (
        <MonthGrid key={offset} monthDate={addMonths(baseDate, offset)} />
      ))}
    </div>
  );
};

export default Calendar;