export type RootStackParamList = {
  Calendar: undefined;
  EventForm: { date?: string; hour?: string; calendarId?: string };
  EventDetailsScreen: undefined;
  DayViewScreen: undefined;
  CreateCalendarForm: undefined;
  CalendarDetailsScreen: { calendarId: string };
  CreateEvent: { calendarId: string; selectedDate: string };
};