import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Yup from "yup";

import PrimaryButton from "@/components/ui/PrimaryButton";
import EventForm from "@/components/EventForm/EventForm";

import { useCalendarStore } from "@/store/calendarStore";
import { useEventContext } from "@/context/event-context";
import { CalendarEvent, EventFormErrors } from "@/types/Events";
import { CreateEventRouteParams } from "@/types/route";
import { eventSchema } from "@/validation/EventFrorm";

import Colors from "@/constants/colors";

const CreateEventScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { calendarId, selectedDate } = route.params as CreateEventRouteParams;

  const { addEventToCalendar } = useCalendarStore();
  const { eventData } = useEventContext();

const [errors, setErrors] = useState<Partial<EventFormErrors>>({});

  
  
  const handleCreateEvent = async () => {
    try {
    const validate =   await eventSchema.validate(eventData, { abortEarly: false });

    console.log("123", validate)

      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        date: selectedDate,
        startTime: eventData.startTime.slice(0, 5),
        endTime: eventData.endTime.slice(0, 5),
        title: eventData.title.trim(),
        location: eventData.location.trim(),
        type: eventData.eventType as CalendarEvent["type"],
      };
      console.log("NewEvent", newEvent)

      addEventToCalendar(calendarId, newEvent);
      navigation.goBack();
    } catch (err: any) {
      const formErrors: { [key: string]: string } = {};
      err.inner?.forEach((e: Yup.ValidationError) => {
        formErrors[e.path!] = e.message;
      });
      setErrors(formErrors)
      console.log("Validation errors", formErrors);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <TouchableWithoutFeedback>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <Text style={styles.header}>Create an event</Text>
            <EventForm selectedDate={selectedDate} validation={errors}/>
          </View>
          <PrimaryButton onPress={handleCreateEvent}>
            <Text>Create an event</Text>
          </PrimaryButton>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
    flexGrow: 1,
    justifyContent: "space-between",
  },
  content: {
    flexShrink: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
