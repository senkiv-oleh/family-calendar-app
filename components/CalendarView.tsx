import React, { useState, useEffect, ReactNode } from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import CalendarComponent from "./ui/CalendarComponent";

import Icon from "./ui/Icon";
import { getFormattedDate } from "../helpers/date";
import SimpleDropdown from "./ui/Dropdown";
import { MonthsShorts } from "../constants/date";

const today = new Date();

const years = Array.from({ length: 126 }, (_, i) => today.getFullYear() - i);

type CalendarViewProps = {
  onPressDay: (day: { dateString: string }) => void;
  markedDates: any;
  events: any[];
};

interface Event {
  title: ReactNode;
  startTime: ReactNode;
  endTime: ReactNode;
  name: string;
  time: string;
  location: string;
  description: string;
  type: "Meeting" | "Birthday" | "Reminder";
}

const CalendarView = ({
  onPressDay,
  markedDates,
  events
}: CalendarViewProps) => {
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [items, setItems] = useState<{ [key: string]: Event[] }>({});

  const selectedDate = getFormattedDate(today.getFullYear(), today.getMonth());
  console.log(selectedDate);

  const handleMonthChange = (direction: "prev" | "next") => {
    setSelectedMonth(prev => {
      if (direction === "prev") {
        if (prev === 0) {
          setSelectedYear(year => year - 1);
          return 11;
        }
        return prev - 1;
      } else {
        if (prev === 11) {
          setSelectedYear(year => year + 1);
          return 0;
        }
        return prev + 1;
      }
    });
  };

  const renderItem = (item: Event) =>
    <View style={styles.item}>
      <Text style={styles.name}>
        {item.title}
      </Text>
      <Text style={styles.time}>
        {item.startTime} - {item.endTime}
      </Text>
      <Text style={styles.location}>
        📍 {item.location}
      </Text>
      <Text style={styles.description}>
        {item.type}
      </Text>
    </View>;

  const loadItems = () => {
    const newItems: { [key: string]: Event[] } = {};
    events.forEach(event => {
      if (!newItems[event.date]) {
        newItems[event.date] = [];
      }
      newItems[event.date].push(event);
    });
    setItems(newItems);
  };

  const renderDayEvents = () => {
    const todayEvents = events.filter(event => event.date === selectedDate);
    return todayEvents.length > 0
      ? todayEvents.map((event, index) =>
          <View key={index} style={styles.item}>
            <Text style={styles.name}>
              {event.title}
            </Text>
            <Text style={styles.time}>
              {event.startTime} - {event.endTime}
            </Text>
            <Text style={styles.location}>
              📍 {event.location}
            </Text>
            <Text style={styles.description}>
              {event.type}
            </Text>
          </View>
        )
      : <View style={styles.emptyDate}>
          <Text>No events for today</Text>
        </View>;
  };

  return (
    <View>
      <View style={styles.calendarHeader}>
        <View style={styles.dropdownContainer}>
          <Pressable onPress={() => handleMonthChange("prev")}>
            <Icon icon="arrow-back-ios" style={styles.icon} />
          </Pressable>
          <SimpleDropdown
            data={MonthsShorts}
            selectedValue={MonthsShorts[selectedMonth]}
            label="Select month"
            onSelect={(item: any) =>
              setSelectedMonth(MonthsShorts.indexOf(item))}
          />
          <Pressable onPress={() => handleMonthChange("next")}>
            <Icon icon="arrow-forward-ios" style={styles.icon} />
          </Pressable>
        </View>

        <View style={styles.dropdownContainer}>
          <Pressable onPress={() => setSelectedYear(prev => prev - 1)}>
            <Icon icon="arrow-back-ios" style={styles.icon} />
          </Pressable>
          <SimpleDropdown
            data={years}
            selectedValue={selectedYear}
            label="Select year"
            onSelect={(item: any) => setSelectedYear(item)}
          />
          <Pressable onPress={() => setSelectedYear(prev => prev + 1)}>
            <Icon icon="arrow-forward-ios" style={styles.icon} />
          </Pressable>
        </View>
      </View>

      <CalendarComponent
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onPressDay={onPressDay}
        markedDates={markedDates}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
      />
    </View>
  );
};

export default CalendarView;

const styles = StyleSheet.create({
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 8,
    marginBottom: 10
  },
  dropdownContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  icon: {
    color: "#A28DD0"
  },
  eventItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  eventDate: {
    fontSize: 14,
    color: "#555"
  },
  eventLocation: {
    fontSize: 14,
    color: "#777"
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 20,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 50,
    flex: 1,
    paddingTop: 30
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333"
  },
  time: {
    fontSize: 14,
    color: "#555",
    marginTop: 5
  },
  location: {
    fontSize: 14,
    color: "#777",
    marginTop: 5
  },
  description: {
    fontSize: 12,
    color: "#999",
    marginTop: 5
  }
});
