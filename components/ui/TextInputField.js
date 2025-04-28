import { View, Text, TextInput } from 'react-native';

const TextInputField = ({ label, value, onChangeText, type = 'text', placeholder, styles }) => {
  return (
    // <View style={styles.inputContainer}>
    //   <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        // secureTextEntry={type === 'password'}
      />
    // </View>
  );
}

export default TextInputField;