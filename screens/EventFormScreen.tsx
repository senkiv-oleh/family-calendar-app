import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from "../types/RootStackParamList";

type EventFormRouteProp = RouteProp<RootStackParamList, 'EventForm'>;

const EventFormScreen = () => {
  const route = useRoute<EventFormRouteProp>();
  const { date } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Date: {date ?? 'no date'}</Text>
      <Text style={styles.title}>Event</Text>
      <TextInput style={styles.input} placeholder="Enter title..." />
      {/* <Button style={styles.button} title="Save event" onPress={() => {}} /> */}
           <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1FA',
    justifyContent: 'center',
    paddingHorizontal: 20,
    display: 'flex',

  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 40,
    color: '#3F3D56',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D6C8EC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D6C8EC',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
  },
  dateText: {
    color: '#333',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#C3A6FF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EventFormScreen;
