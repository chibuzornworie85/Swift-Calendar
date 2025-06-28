import React from 'react';
import { CalendarProvider } from './context/CalendarContext';
import Calendar from './components/Calendar';
import './App.css'

const App: React.FC = () => {
  return (
    <CalendarProvider>
      <main className="app-container">
        <h1 className="app-title">Swift Calendar</h1>
        <Calendar />
      </main>
    </CalendarProvider>
  );
};

export default App;
