import { StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const Icon = ({icon, style}) => {
  return <MaterialIcons name={icon} size={20} style={style} />
}


export default Icon
