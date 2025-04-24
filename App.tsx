// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';

// import { MaterialIcons } from '@expo/vector-icons';
// import { format } from 'date-fns';

// export type RootStackParamList = {
//   Calendar: undefined;
//   EventForm: { date?: string; hour?: string };
// };

// export default function App() {
//   const [surname, setSurname] = useState('');
//   const [date, setDate] = useState<Date | null>(null);
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   const showDatePicker = () => setDatePickerVisibility(true);
//   const hideDatePicker = () => setDatePickerVisibility(false);

//   const handleConfirm = (selectedDate: Date) => {
//     setDate(selectedDate);
//     hideDatePicker();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Реєстрація</Text>

//       <TextInput
//         placeholder="ПІД"
//         style={styles.input}
//         value={surname}
//         onChangeText={setSurname}
//       />

//       <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
//         <Text style={styles.dateText}>
//           {date ? format(date, 'dd/MM/yyyy') : 'Дата народження'}
//         </Text>
//         <MaterialIcons name="calendar-today" size={24} color="#A28DD0" />
//       </TouchableOpacity>

//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}
//       />

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Далі</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F6F1FA',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     marginBottom: 40,
//     color: '#3F3D56',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#D6C8EC',
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//   },
//   dateInput: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#D6C8EC',
//     borderRadius: 10,
//     padding: 12,
//     backgroundColor: '#fff',
//   },
//   dateText: {
//     color: '#333',
//   },
//   button: {
//     marginTop: 40,
//     backgroundColor: '#C3A6FF',
//     padding: 15,
//     borderRadius: 25,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

import React from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarScreen from "./screens/CalendarScreen";
import EventFormScreen from "./screens/EventFormScreen";
import CustomCalendar from "./screens/CustomCalendar";


export type RootStackParamList = {
  Calendar: undefined;
  EventForm: { date?: string; hour?: string };
};

// ❗️Ось тут ми створюємо Stack після визначення типу RootStackParamList
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Calendar">
        <Stack.Screen
          name="Calendar"
          component={CustomCalendar}
          options={{ title: "Calendar" }}
        />
        <Stack.Screen
          name="EventForm"
          component={EventFormScreen}
          options={{ title: "New event" }}
        />
      </Stack.Navigator>
  
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1FA",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 40,
    color: "#3F3D56"
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
  },
  button: {
    marginTop: 40,
    backgroundColor: "#C3A6FF",
    padding: 15,
    borderRadius: 25,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});
