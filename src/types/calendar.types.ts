export interface NotesType {
  [date: string]: string;
}

export interface CalendarContextType {
  notes: NotesType;
  setNote: (date: string, note: string) => void;
}
