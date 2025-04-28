import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useCalendarStore } from "../store/calendarStore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";

import Colors from "../constants/colors";
import Icon from "./ui/Icon";

interface Props {
  onSelectCalendar: (calendarId: string) => void;
  onPressed: (calendarId: string) => void;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Calendar">;

const CalendarList: React.FC<Props> = ({ onSelectCalendar, onPressed }) => {
  const navigation = useNavigation<NavigationProp>();

  const { calendars, addCalendar } = useCalendarStore();

  return (
    <View style={styles.container}>
      <FlatList
        data={calendars}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              onSelectCalendar(item.id);
              onPressed(item.id);

              navigation.navigate("CalendarDetailsScreen", {
                calendarId: item.id
              });
            }}
          >
            <Text style={styles.itemText}>
              {item.name}
            </Text>
            <Icon icon="add" style={styles.icon} />
          </TouchableOpacity>}
        ListEmptyComponent={<Text style={styles.empty}>No calendars</Text>}
      />
    </View>
  );
};

export default CalendarList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "100%"
  },

  item: {
    padding: 12,
    backgroundColor: Colors.primary200,
    borderRadius: 8,
    marginVertical: 5,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  itemText: {
    fontSize: 16
  },
  createBtn: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#007aff",
    borderRadius: 8,
    alignItems: "center"
  },
  createBtnText: {
    color: "white",
    fontWeight: "600"
  },
  empty: {
    marginTop: 10,
    fontStyle: "italic",
    color: "gray"
  },

  icon: {
    marginLeft: 10,
    color: Colors.primary500,
    textAlign: "center"
  }
});
