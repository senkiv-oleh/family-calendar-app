import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CalendarScreen from "./screens/CalendarScreen";
import EventFormScreen from "./screens/EventDetailsScreen";
import CreateCalendarForm from "./screens/CreateCalendarForm";
import CalendarDetailsScreen from "./screens/CalendarDetailsScreen";
import CreateEventScreen from "./screens/CreateEventScreen";

import { RootStackParamList } from "./types/RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Calendar">
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{ title: "Calendar" }}
        />

          <Stack.Screen
          name="CreateCalendarForm"
          component={CreateCalendarForm}
          options={{ title: "Create calendar" }}
        />

        <Stack.Screen
          name="EventForm"
          component={EventFormScreen}
          options={{ title: "New event" }}
        />

      

        <Stack.Screen
          name="CalendarDetailsScreen"
          component={CalendarDetailsScreen}
          options={{ title: "Create details" }}
        />

        <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
