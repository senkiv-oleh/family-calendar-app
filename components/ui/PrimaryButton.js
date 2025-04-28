import { View, Text, Pressable, StyleSheet } from 'react-native'
import Colors from '@/constants/colors'
import Icon from './Icon'

const PrimaryButton = ({ children, onPress, icon = '', style = {} }) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed, style]
            : [styles.buttonInnerContainer, style]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{children}</Text>{' '}
        {icon && <Icon icon={icon} style={styles.icon} />}
      </Pressable>
    </View>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  buttonOuterContainer: {
    margin: 4
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary300,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center', 
    
  },
  buttonText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
      color: "#fff",
    textAlign: 'center',
    fontSize: 16,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75
  },
  icon: {
    marginLeft: 10,
    color: Colors.primary500,
    textAlign: 'center'
  }
})
