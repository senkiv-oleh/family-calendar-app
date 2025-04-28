import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCalendarStore } from "../store/calendarStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { CalendarEvent } from "@/types/Events";

type RouteParams = {
  calendarId: string;
  selectedDate: string;
};

const CreateEventScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { calendarId, selectedDate } = route.params as RouteParams;

  const { addEventToCalendar } = useCalendarStore();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState<CalendarEvent["type"]>("visit");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleCreateEvent = () => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      date: selectedDate,
      startTime: startTime.toTimeString().slice(0, 5),
      endTime: endTime.toTimeString().slice(0, 5),
      title,
      location,
      type
    };

    addEventToCalendar(calendarId, newEvent);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Створити подію</Text>

      <Text>Назва події</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Введіть назву події"
      />

      <Text>Локація</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Введіть місце"
      />

      <Text>Тип події</Text>
      <Picker
        selectedValue={type}
        onValueChange={itemValue => setType(itemValue as CalendarEvent["type"])}
        style={styles.input}
      >
        <Picker.Item label="Візит" value="visit" />
        <Picker.Item label="Зустріч з дитиною" value="meeting-child" />
        <Picker.Item label="Зустріч з партнером" value="meeting-partner" />
        <Picker.Item label="Інша подія" value="event" />
      </Picker>

      <Text>Час початку</Text>
      <Button
        title={startTime.toTimeString().slice(0, 5)}
        onPress={() => setShowStartPicker(true)}
      />
      {showStartPicker &&
        <DateTimePicker
          value={startTime}
          mode="time"
          is24Hour={true}
          onChange={(_, date) => {
            setShowStartPicker(false);
            if (date) setStartTime(date);
          }}
        />}

      <Text>Час закінчення</Text>
      <Button
        title={endTime.toTimeString().slice(0, 5)}
        onPress={() => setShowEndPicker(true)}
      />
      {showEndPicker &&
        <DateTimePicker
          value={endTime}
          mode="time"
          is24Hour={true}
          onChange={(_, date) => {
            setShowEndPicker(false);
            if (date) setEndTime(date);
          }}
        />}

      <Button title="Створити подію" onPress={handleCreateEvent} />
    </ScrollView>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8
  }
});
