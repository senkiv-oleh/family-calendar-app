export interface CalendarEvent {
  id: string;
  date: string;
  startTime: string;
  endTime: string; 
  type: 'visit' | 'meeting-child' | 'meeting-partner' | 'event';
  title: string;
  location: string;
  withChild?: boolean;
}
