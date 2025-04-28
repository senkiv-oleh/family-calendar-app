import { View, Text, TextInput } from 'react-native'

const TextInputField = ({
  label,
  value,
  onChangeText,
  type = 'text',
  placeholder,
  styles
}) => {
  return (
    <TextInput
      style={styles}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      type={type}
      label={label}
    />
  )
}

export default TextInputField
