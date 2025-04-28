import React, { useMemo } from 'react'
import { View, Text, Modal, Button, StyleSheet, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useCalendarStore } from '../store/calendarStore'
import { RootStackParamList } from '../types/RootStackParamList'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import PrimaryButton from './ui/PrimaryButton'
import TransparentButton from './ui/TransparentButton'

type Props = {
  visible: boolean
  date: string
  calendarId: string
  onClose: () => void
}

const DayEventsModal = ({ visible, date, calendarId, onClose }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { calendars } = useCalendarStore()

  const events = useMemo(() => {
    const calendar = calendars.find(c => c.id === calendarId)
    return calendar?.events.filter(event => event.date === date) || []
  }, [calendars, calendarId, date])

  const handleCreateEvent = () => {
    onClose()
    navigation.navigate('CreateEvent', { calendarId, selectedDate: date })
  }

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Події на {date}</Text>

          {events.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Немає подій на цей день.</Text>
              <PrimaryButton
                onPress={() => handleCreateEvent()}
                style={[styles.button, { marginTop: 10 }]}
              >
                Create event
              </PrimaryButton>
            </View>
          ) : (
            <>
              <FlatList
                data={events}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <View style={styles.eventItem}>
                    <Text style={styles.eventTitle}>{item.title}</Text>
                    <Text>
                      {item.startTime} - {item.endTime}
                    </Text>
                  </View>
                )}
              />
              <PrimaryButton
                onPress={() => handleCreateEvent()}
                style={[styles.button, { marginTop: 10 }]}
              >
                Create event
              </PrimaryButton>{' '}
            </>
          )}

          <TransparentButton
            onPress={() => onClose()}
            style={[styles.button, { marginTop: 10 }]}
          >
            Close
          </TransparentButton>
        </View>
      </View>
    </Modal>
  )
}

export default DayEventsModal

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  emptyContainer: {
    alignItems: 'flex-start',
    marginTop: 20
  },
  emptyText: {
    fontSize: 16,
    marginBottom: 10
  },
  eventItem: {
    alignItems: 'flex-start',
    minWidth: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  button: {
    minWidth: '100%'
  }
})
