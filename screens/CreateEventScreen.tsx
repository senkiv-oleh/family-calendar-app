import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCalendarStore } from "../store/calendarStore";
import { CalendarEvent } from "@/types/Events";
import { EVENT_LABELS } from "../constants/eventType";
import SimpleDropdown from "@/components/ui/Dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Colors from "../constants/colors";
import PrimaryButton from "@/components/ui/PrimaryButton";
import * as Yup from "yup";
import Icon from "@/components/ui/Icon";
import { format } from "date-fns";
import CalendarView from "@/components/CalendarView";

type RouteParams = {
  calendarId: string;
  selectedDate: string;
};

const eventSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required.")
    .min(3, "Title must be longer than 3 letters"),
  location: Yup.string().required("Location is required."),
  eventType: Yup.string().required("Event type is required."),
  startTime: Yup.string().required("Start time is required."),
  endTime: Yup.string()
    .required("End time is required.")
    .test("is-after-start", "End time must be after start time.", function(
      value
    ) {
      const { startTime } = this.parent;
      return startTime && value && startTime < value;
    })
});

const CreateEventScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { calendarId, selectedDate } = route.params as RouteParams;
  const { addEventToCalendar } = useCalendarStore();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [isPickerVisible, setPickerVisible] = useState(false);
  const [activeField, setActiveField] = useState<"start" | "end" | null>(null);

  const formatter = (date: Date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

  const showPicker = (field: "start" | "end") => {
    setActiveField(field);
    setPickerVisible(true);
  };

  const hidePicker = () => {
    setPickerVisible(false);
    setActiveField(null);
  };

  const handleConfirm = (date: Date) => {
    const formatted = formatter(date);

    if (activeField === "start") {
      setStartTime(formatted);
      const endDate = new Date(date);
      endDate.setHours(endDate.getHours() + 1);
      setEndTime(formatter(endDate));
    } else if (activeField === "end") {
      setEndTime(formatted);
    }

    hidePicker();
  };

  const handleCreateEvent = async () => {
    try {
      await eventSchema.validate(
        { title, location, eventType, startTime, endTime },
        { abortEarly: false }
      );

      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        date: selectedDate,
        startTime: startTime.slice(0, 5),
        endTime: endTime.slice(0, 5),
        title: title.trim(),
        location: location.trim(),
        type: eventType as CalendarEvent["type"]
      };

      addEventToCalendar(calendarId, newEvent);
      navigation.goBack();
    } catch (err) {
      if (err.inner) {
        const formErrors: { [key: string]: string } = {};
        err.inner.forEach((e: Yup.ValidationError) => {
          formErrors[e.path!] = e.message;
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create an event</Text>
      <View style={styles.innerContainer}>
        <Text>Date</Text>

        <View style={[styles.input, styles.calendarDropdown]}>
          <Text>
            {format(new Date(selectedDate), "dd/MM/yyyy")}
          </Text>
          <Icon icon="calendar-today" style={{ color: Colors.primary500 }} />
        </View>

        <Text>Event title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={text => {
            setTitle(text);
            setErrors(prev => ({ ...prev, title: "" }));
          }}
          placeholder="Enter the event title"
        />

        {errors.title &&
          <Text style={styles.error}>
            {errors.title}
          </Text>}

        <Text>Location:</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={text => {
            setLocation(text);
            setErrors(prev => ({ ...prev, location: "" }));
          }}
          placeholder="Enter a location"
        />
        {errors.location &&
          <Text style={styles.error}>
            {errors.location}
          </Text>}

        <Text>Event type</Text>
        <SimpleDropdown
          data={EVENT_LABELS}
          selectedValue={eventType}
          label="Select event type"
          onSelect={(item: any) => {
            setEventType(item);
            setErrors(prev => ({ ...prev, eventType: "" }));
          }}
          style={{ text: { fontSize: 14 }, input: styles.select }}
        />
        {errors.eventType &&
          <Text style={styles.error}>
            {errors.eventType}
          </Text>}

        <Text>Time of event:</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.input, styles.timeBox]}
            onPress={() => showPicker("start")}
          >
            <Text style={styles.timeText}>
              {startTime || "start"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.separator}>—</Text>

          <TouchableOpacity
            style={[styles.input, styles.timeBox]}
            onPress={() => showPicker("end")}
          >
            <Text style={styles.timeText}>
              {endTime || "end"}
            </Text>
          </TouchableOpacity>
        </View>
        {errors.startTime &&
          <Text style={styles.error}>
            {errors.startTime}
          </Text>}
        {errors.endTime &&
          <Text style={styles.error}>
            {errors.endTime}
          </Text>}

        <DateTimePickerModal
          isVisible={isPickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hidePicker}
          is24Hour={false}
          confirmTextIOS="Confirm"
          cancelTextIOS="Cancel"
          buttonTextColorIOS={Colors.primary500}
          themeVariant="light"
          textColor="black"
          customHeaderIOS={() =>
            <View style={styles.customHeader}>
              <Text style={styles.headerText}>Time</Text>
            </View>}
        />
      </View>
      <PrimaryButton onPress={handleCreateEvent}>
        <Text>Create an event</Text>
      </PrimaryButton>
    </ScrollView>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.primary100
  },
  innerContainer: {
    marginBottom: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },

  input: {
    borderWidth: 1,
    borderColor: "#D6C8EC",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
    marginVertical: 5
  },
  calendarDropdown: {
    borderWidth: 1,
    borderColor: "#D6C8EC",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
    marginVertical: 5,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  select: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D6C8EC",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
    marginVertical: 5
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  timeBox: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center"
  },
  timeText: {
    fontSize: 14
  },
  separator: {
    marginHorizontal: 12,
    fontSize: 18,
    color: "#6B7280"
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: -4,
    marginBottom: 6
  },
  customHeader: {
    backgroundColor: Colors.primary800,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center"
  }
});
