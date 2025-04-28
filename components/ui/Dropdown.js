import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Icon from './Icon'

const SimpleDropdown = ({ data, selectedValue, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = item => {
    onSelect(item)
    setIsOpen(false)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setIsOpen(prev => !prev)}
      >
        <Text style={styles.inputText}>
          {selectedValue || label}
        </Text>
        <Icon
          icon='arrow-drop-down'
          style={[styles.arrowIcon, { color: '#A28DD0' }]}
        />
        {/* <MaterialIcons
          style={styles.arrowIcon}
          name='arrow-drop-down'
          size={24}
          color='#A28DD0'
        /> */}
      </TouchableOpacity>

      {isOpen &&
        <View style={styles.dropdown}>
          <FlatList
            data={data}
            keyExtractor={item => item.toString()}
            renderItem={({ item }) =>
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text>
                  {item}
                </Text>
              </TouchableOpacity>}
          />
        </View>}
    </View>
  )
}

export default SimpleDropdown

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparant',
    height: 45
  },
  inputText: {
    color: '#333',
    fontSize: 18
  },
  arrowIcon: {
    marginLeft: 8
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: -20,
    right: -20,
    borderWidth: 1,
    borderColor: '#D6C8EC',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 5,
    maxHeight: 200,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5
    // width: 300
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  optionText: {
    color: '#333',
    fontSize: 16
  }
})
