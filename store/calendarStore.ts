import { create } from "zustand";
import { CalendarEvent } from "../types/Events";

interface Calendar {
  id: string;
  name: string;
  events: CalendarEvent[];
}

interface CalendarStore {
  calendars: Calendar[];
  addCalendar: (name: string) => void;
  addEventToCalendar: (calendarId: string, event: CalendarEvent) => void;
}

export const useCalendarStore = create<CalendarStore>(set => ({
  calendars: [
    { id: "1", name: "Work", events: [] },
    { id: "2", name: "Personal", events: [] }
  ],
  addCalendar: name =>
    set(state => ({
      calendars: [
        ...state.calendars,
        { id: Date.now().toString(), name, events: [] }
      ]
    })),
  addEventToCalendar: (calendarId, event) =>
    set(state => ({
      calendars: state.calendars.map(
        calendar =>
          calendar.id === calendarId
            ? { ...calendar, events: [...calendar.events, event] }
            : calendar
      )
    }))
}));

export { CalendarEvent };
