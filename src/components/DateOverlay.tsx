import { forwardRef, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { useCalendar } from '../context/CalendarContext';
import { Props } from '../types/dateOverlay.types';

const DateOverlay = forwardRef<HTMLDivElement | null, Props>(({ date, position, onClose }, ref) => {
  const { notes, setNote } = useCalendar();
  const [note, setLocalNote] = useState(notes[format(date, 'yyyy-MM-dd')] || '');
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    const handleResize = () => {
    onClose();
  };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    window.removeEventListener('resize', handleResize);
  };
  }, [onClose]);

  const handleSave = () => {
    setNote(format(date, 'yyyy-MM-dd'), note);
    onClose();
  };

  return (
    <div
      className={`date-overlay ${position.placement}`}
      ref={(el) => {
        overlayRef.current = el;
        if (typeof ref === 'function') ref(el);
      }}
      style={{ top: position.top, left: position.left }}
      role="dialog"
      aria-modal="true"
    >
      <div className="overlay-content">
        <p className="overlay-date">{format(date, 'PPP')}</p>
        <textarea
          maxLength={100}
          value={note}
          onChange={(e) => setLocalNote(e.target.value)}
          className="overlay-textarea"
          placeholder="Add a note..."
        />
        <div className="overlay-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
});

export default DateOverlay;