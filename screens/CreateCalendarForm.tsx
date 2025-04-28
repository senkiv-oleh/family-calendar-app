import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,TouchableOpacity, FlatList, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types/RootStackParamList";

import { useCalendarStore } from '../store/calendarStore';
import PrimaryButton from '@/components/ui/PrimaryButton';

interface Props {
  onSuccess?: () => void;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Calendar">;

const CreateCalendarForm: React.FC<Props> = ({ onSuccess }) => {
    const navigation = useNavigation<NavigationProp>();
  
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(false)

  const addCalendar = useCalendarStore((state) => state.addCalendar);

  const handleSubmit = () => {
    if (name.trim()) {
      addCalendar(name.trim());
      setName('');
      onSuccess?.();
      navigation.navigate("Calendar")
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Calendar name"
        style={styles.input}
      />


      <PrimaryButton onPress={() => handleSubmit()} style={{ marginTop: 10 }}>
        Create Calendar
      </PrimaryButton>


    </View>
  );
};

export default CreateCalendarForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f6f1fa"
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D6C8EC',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
    marginVertical: 5
  },
});
