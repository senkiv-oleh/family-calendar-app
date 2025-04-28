import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CalendarEvent } from "../types/Events";

interface NearestEventsListProps {
  events: CalendarEvent[];
}

const NearestEventsList: React.FC<NearestEventsListProps> = ({ events }) => {
  const nearestEvents = useMemo(
    () => {
      const today = new Date();

      return events
        .filter(event => new Date(event.date) >= today)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 2);
    },
    [events]
  );

  if (nearestEvents.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noEventsText}>There are no upcoming events.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upcoming events:</Text>
      {nearestEvents.map(event =>
        <View key={event.id} style={styles.eventItem}>
          <Text style={styles.eventTitle}>
            {event.title}
          </Text>
          <Text style={styles.eventDate}>
            {event.date} ({event.startTime} - {event.endTime})
          </Text>
          <Text style={styles.eventLocation}>
            {event.location}
          </Text>
        </View>
      )}
    </View>
  );
};

export default NearestEventsList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8
  },
  eventItem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#e6f0ff",
    borderRadius: 8
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  eventDate: {
    fontSize: 14,
    color: "#555",
    marginTop: 4
  },
  eventLocation: {
    fontSize: 14,
    color: "#777",
    marginTop: 2
  },
  noEventsText: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic"
  }
});
