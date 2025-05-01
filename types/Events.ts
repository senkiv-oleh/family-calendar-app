export type CalendarEvent = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  type: "visit" | "meeting-child" | "meeting-partner" | "event";
  title: string;
  location: string;
  withChild?: boolean;
};

export type EventFormErrors = {
  title: string;
  location: string;
  eventType: string;
  startTime: string;
  endTime: string;
};

export type ActiveField = "start" | "end" | null;
