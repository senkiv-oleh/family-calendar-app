import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

import Icon from "../ui/Icon";
import Colors from "../../constants/colors";
import { EVENT_LABELS } from "../../constants/eventType";
import SimpleDropdown from "../ui/Dropdown";
import TextInputField from "@/components/ui/TextInputField";
import { useEventContext } from "@/context/event-context";
import { formatTime } from "@/utils/date";
import { EventFormErrors, ActiveField } from "../../types/Events";

const EventForm = ({
  selectedDate,
  validation
}: {
  selectedDate: string;
  validation: Partial<EventFormErrors>;
}) => {
  const { eventData, handleEventData } = useEventContext();
  console.log("ABC", validation);
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [errors, setErrors] = useState<EventFormErrors>({
    title: "",
    location: "",
    eventType: "",
    startTime: "",
    endTime: ""
  });
  const [isPickerVisible, setPickerVisible] = useState<boolean>(false);
  const [activeField, setActiveField] = useState<ActiveField>(null);

  console.log("err", errors);

  useEffect(
    () => {
      setErrors({
        title: validation.title || "",
        location: validation.location || "",
        eventType: validation.eventType || "",
        startTime: validation.startTime || "",
        endTime: validation.endTime || ""
      });
    },
    [validation]
  );

  const showPicker = (field: ActiveField) => {
    setActiveField(field);
    setPickerVisible(true);
  };

  const hidePicker = () => {
    setPickerVisible(false);
    setActiveField(null);
  };

  const handleConfirm = (date: Date) => {
    const formattedTime = formatTime(date);

    if (activeField === "start") {
      setStartTime(formattedTime);
      handleEventData("startTime", formattedTime);
      setErrors(prev => ({ ...prev, startTime: "" }));

      const endDate = new Date(date);
      endDate.setHours(endDate.getHours() + 1);
      const formattedEndTime = formatTime(endDate);
      setEndTime(formattedEndTime);
      handleEventData("endTime", formattedEndTime);
      setErrors(prev => ({ ...prev, endTime: "" }));
    } else if (activeField === "end") {
      setEndTime(formattedTime);
      handleEventData("endTime", formattedTime);
    }

    hidePicker();
  };

  return (
    <View style={styles.innerContainer}>
      <Text>Date</Text>
      <View style={[styles.input, styles.calendarDropdown]}>
        <Text>
          {format(new Date(selectedDate), "dd/MM/yyyy")}
        </Text>
        <Icon icon="calendar-today" style={{ color: Colors.primary500 }} />
      </View>

      <Text>Event title</Text>
      <TextInputField
        styles={styles.input}
        value={title}
        onChangeText={(text: string) => {
          setTitle(text);
          handleEventData("title", text);
          setErrors(prev => ({ ...prev, title: "" }));
        }}
        placeholder="Enter the event title"
        label="Event title"
      />
      {errors.title &&
        <Text style={styles.error}>
          {errors.title}
        </Text>}

      <Text>Location:</Text>
      <TextInputField
        styles={styles.input}
        value={location}
        onChangeText={(text: string) => {
          setLocation(text);
          handleEventData("location", text);
          setErrors(prev => ({ ...prev, location: "" }));
        }}
        placeholder="Enter a location"
        label="Location"
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
        onSelect={(item: string) => {
          setEventType(item);
          handleEventData("eventType", item);
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
  );
};

export default EventForm;

const styles = StyleSheet.create({
  innerContainer: {
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
