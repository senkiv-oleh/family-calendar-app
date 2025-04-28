import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import dayjs from "dayjs";

import { RootStackParamList } from "../types/RootStackParamList";

import CalendarList from "@/components/CalendarList";
import TransparentButton from "@/components/ui/TransparentButton";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Calendar">;

const CalendarScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customDate, setCustomDate] = useState(dayjs());

  const handleDayPress = (day: { dateString: string }) => {
    console.log("Selected day:", day.dateString);
  };

  const [surname, setSurname] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TransparentButton
          onPress={() => navigation.navigate("CreateCalendarForm")}
          icon="add"
          style={styles.button}
        >
          Create calendar
        </TransparentButton>
      </View>
      <Text style={styles.title}>Your calendars</Text>
      <View style={styles.innerContainer}>
        <CalendarList
          onSelectCalendar={setSelectedId}
          onPressed={(id: string) => console.log(`created event ${id}`)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    backgroundColor: "#f6f1fa"
  },
  innerContainer: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonContainer: {
    alignItems: "flex-end"
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  }
});

export default CalendarScreen;
