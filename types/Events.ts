// types.ts
export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  type: 'visit' | 'meeting-child' | 'meeting-partner' | 'event';
  title: string;
  location: string;
  withChild?: boolean;
}
