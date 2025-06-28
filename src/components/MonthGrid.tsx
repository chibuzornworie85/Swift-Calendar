import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { useCalendar } from '../context/CalendarContext';
import DateOverlay from './DateOverlay';

const MonthGrid: React.FC<{ monthDate: Date }> = ({ monthDate }) => {
  const { notes } = useCalendar();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [overlayPosition, setOverlayPosition] = React.useState<{ top: number; left: number; placement: 'left' | 'right' } | null>(null);
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

const handleClick = (date: Date, event: React.MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const overlayWidth = 220;
  const gap = 4;

  const fitsRight = rect.left + overlayWidth < window.innerWidth;
  const placement: 'left' | 'right' = fitsRight ? 'right' : 'left';

  const left = fitsRight
    ? rect.left + window.scrollX
    : rect.right + window.scrollX;

  const top = rect.bottom + window.scrollY + gap;

  setSelectedDate(date);
  setOverlayPosition({ top, left, placement });
};

  const handleClose = () => setSelectedDate(null);

  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const currentDay = day;
      const dateStr = format(currentDay, 'yyyy-MM-dd');
      const hasNote = !!notes[dateStr];
      const cellClass = [
        'calendar-cell',
        isSameMonth(currentDay, monthStart) ? '' : 'disabled',
        isSameDay(currentDay, new Date()) ? 'today' : '',
        hasNote ? 'has-note' : '',
      ].join(' ');

      days.push(
        <div
          key={dateStr}
          className={cellClass}
          onClick={(e) => handleClick(currentDay, e)}
          tabIndex={0}
          aria-label={`Select date ${dateStr}`}
          onKeyDown={(e) => e.key === 'Enter' && handleClick(currentDay, e as any)}
        >
          {format(currentDay, 'd')}
          {hasNote && <span className="note-indicator" aria-hidden="true">•</span>}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(<div className="calendar-row" key={day.toString()}>{days}</div>);
    days = [];
  }

  return (
    <div className="month-grid">
      <h2 className="month-title">{format(monthDate, 'MMMM yyyy')}</h2>
      <div className="calendar-grid">{rows}</div>
      {selectedDate && overlayPosition && (
        <DateOverlay
          date={selectedDate}
          position={overlayPosition}
          onClose={handleClose}
          ref={overlayRef}
        />
      )}
    </div>
  );
};

export default MonthGrid;