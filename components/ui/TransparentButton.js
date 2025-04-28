import { View, Text, Pressable, StyleSheet } from 'react-native'
import Colors from '@/constants/colors'
import Icon from './Icon'

const TransparentButton = ({ children, onPress, icon = '', style = {} }) => {
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

export default TransparentButton

const styles = StyleSheet.create({
  buttonOuterContainer: {
    backgroundColor: 'transparent',
    borderRadius: 28,
    margin: 4
  },
  buttonInnerContainer: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 25
  },
  buttonText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: Colors.primary500,
    textAlign: 'center',
    fontSize: 16
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
