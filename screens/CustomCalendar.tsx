import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";
import { Months } from "../constants/Date";
import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";

const years = Array.from({ length: 126 }, (_, i) => 1900 + i);

const getFormattedMonth = (month: number) =>
  (month + 1).toString().padStart(2, "0");

const getFormattedDate = (year: number, month: number) =>
  `${year}-${getFormattedMonth(month)}-01`;

const CustomCalendar = () => {
  const today = new Date();
  const [surname, setSurname] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [calendarKey, setCalendarKey] = useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const formattedDate = getFormattedDate(selectedYear, selectedMonth);

  useEffect(() => {
    setCalendarKey(prev => prev + 1);
  }, [selectedMonth, selectedYear]);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const toggleDatePicker = () => {
    setDatePickerVisibility(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="ПІБ"
        style={styles.input}
        value={surname}
        onChangeText={setSurname}
      />

      <TouchableOpacity style={styles.dateInput} onPress={toggleDatePicker}>
        <Text style={styles.dateText}>
          {selectedDate ? format(new Date(selectedDate), "dd/MM/yyyy") : "Дата народження"}
        </Text>
        <MaterialIcons name="calendar-today" size={24} color="#A28DD0" />
      </TouchableOpacity>

      <Text style={styles.title}>Оберіть місяць та рік</Text>

      {isDatePickerVisible && (
        <View style={styles.calendarContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedMonth}
              style={styles.picker}
              onValueChange={setSelectedMonth}
            >
              {Months.map((month, index) => (
                <Picker.Item key={index} label={month} value={index} />
              ))}
            </Picker>

            <Picker
              selectedValue={selectedYear}
              style={styles.picker}
              onValueChange={setSelectedYear}
            >
              {years.map(year => (
                <Picker.Item key={year} label={year.toString()} value={year} />
              ))}
            </Picker>
          </View>

          <Calendar
            key={calendarKey}
            current={formattedDate}
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: "#C3A6FF"
              }
            }}
            renderHeader={() => null}
            scrollEnabled={false}
            hideArrows
            theme={{
              selectedDayBackgroundColor: "#C3A6FF",
              todayTextColor: "#C3A6FF"
            }}
          />

          <Button
            title="ОК"
            onPress={() => selectedDate && setDatePickerVisibility(false)}
            color="#C3A6FF"
          />
          <Button
            title="Cancel"
            onPress={() => {
              setSelectedDate("");
              setDatePickerVisibility(false);
            }}
            color="#C3A6FF"
          />
          <Button
            title="Clear"
            onPress={() => {
              setDatePickerVisibility(false);
              setSelectedDate("");
            }}
            color="#C3A6FF"
          />
        </View>
      )}

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F6F1FA",
    flex: 1,
    width: "100%"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3F3D56"
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
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff"
  },
  picker: {
    flex: 1
  },
  input: {
    borderWidth: 1,
    borderColor: "#D6C8EC",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#fff"
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6C8EC",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff"
  },
  dateText: {
    color: "#333"
  }
});

export default CustomCalendar;
