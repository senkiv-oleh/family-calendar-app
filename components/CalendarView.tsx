import React, { useState, useEffect, ReactNode } from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import Calendar from "./ui/Calendar";
import { Agenda } from "react-native-calendars";

import Icon from "./ui/Icon";
import { getFormattedDate } from "../helpers/date";
import SimpleDropdown from "./ui/Dropdown";
import { MonthsShorts } from "../constants/date";

const today = new Date();

const years = Array.from({ length: 126 }, (_, i) => today.getFullYear() - i);

type CalendarViewProps = {
  onPressDay: (day: { dateString: string }) => void;
  markedDates: any;
  viewMode: string;
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
  viewMode,
  events
}: CalendarViewProps) => {
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [items, setItems] = useState<{ [key: string]: Event[] }>({});

  console.log("viewMode", events);

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

  const renderItem = (item: Event) => {
    console.log("item2", item);
    return (
      <View style={[styles.item]}>
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
      </View>
    );
  };

  const loadItems = () => {
    console.log("loadItems", events);
    const newItems: { [key: string]: Event[] } = {};

    events.forEach(event => {
      if (!newItems[event.date]) {
        newItems[event.date] = [];
      }
      newItems[event.date].push(event);
    });

    setItems(newItems);
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
      {viewMode === "week"
        ? <Agenda
            items={items}
            // Define a placeholder function for loadItems
            loadItemsForMonth={loadItems}
            renderItem={renderItem}
            selected={"2025-04-29"}
            renderEmptyDate={() =>
              <View style={styles.emptyDate}>
                <Text>No events for this day</Text>
              </View>}
          />
        : <Calendar
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onPressDay={onPressDay}
            // markedDates={markedDates} // не забудь прокинути markedDates у календар
            // viewMode={viewMode} // і режим перегляду
          />}
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
