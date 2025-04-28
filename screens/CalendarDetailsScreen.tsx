import React, { useState, useMemo, useCallback } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { useCalendarStore } from "../store/calendarStore";
import NearestEventsList from "../components/NearestEventsList";
import DayEventsModal from "../components/DayEventsModal";
import CalendarView from "../components/CalendarView";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { CalendarEvent } from "@/types/Events";

type RouteParams = {
  params: {
    calendarId: string;
  };
};

type RootStackParamList = {
  CreateEventScreen: { calendarId: string; defaultDate: string };
};

const CalendarDetailsScreen = ({ route }: { route: RouteParams }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { calendarId } = route.params;
  const { calendars, addEventToCalendar } = useCalendarStore();

  const calendar = calendars.find(c => c.id === calendarId);

  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("month");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDayModalVisible, setIsDayModalVisible] = useState(false);

  if (!calendar) {
    return (
      <View style={styles.centered}>
        <Text>Календар не знайдено.</Text>
      </View>
    );
  }

  const eventsByDate = useMemo(
    () => {
      const map: { [date: string]: boolean } = {};
      calendar.events.forEach(event => {
        map[event.date] = true;
      });
      return map;
    },
    [calendar.events]
  );

  const markedDates = useMemo(
    () => {
      const marked: any = {};
      Object.keys(eventsByDate).forEach(date => {
        marked[date] = { marked: true, dotColor: "blue" };
      });

      if (selectedDate) {
        marked[selectedDate] = {
          ...marked[selectedDate] || {},
          selected: true,
          selectedColor: "lightblue"
        };
      }

      return marked;
    },
    [eventsByDate, selectedDate]
  );

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setIsDayModalVisible(true);
  };

  const closeDayModal = () => {
    setIsDayModalVisible(false);
  };

  const handleCreateEvent = useCallback(
    () => {
      if (!selectedDate) return;
      navigation.navigate("CreateEventScreen", {
        calendarId,
        defaultDate: selectedDate
      });
      setIsDayModalVisible(false);
    },
    [navigation, selectedDate, calendarId]
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.modeSwitcher}>
        <Button title="Day" onPress={() => setViewMode("day")} />
        <Button title="Week" onPress={() => setViewMode("week")} />
        <Button title="Month" onPress={() => setViewMode("month")} />
      </View>

      <View style={styles.calendarContainer}>
        <CalendarView
          markedDates={markedDates}
          onPressDay={handleDayPress}
          viewMode={viewMode}
          events={calendar.events}
        />
      </View>

      <NearestEventsList events={calendar.events} />

      {selectedDate &&
        <DayEventsModal
          visible={isDayModalVisible}
          date={selectedDate}
          onClose={closeDayModal}
          calendarId={calendarId}
        />}
    </ScrollView>
  );
};

export default CalendarDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 50
  },
  calendarContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modeSwitcher: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  }
});
