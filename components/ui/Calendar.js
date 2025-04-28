import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'

import { Calendar } from 'react-native-calendars'
import { getFormattedDate } from './../../helpers/date'


const CalendarView = ({
  selectedMonth,
  selectedYear,
  onPressDay
}) => {

  const [selectedDate, setSelectedDate] = useState('')
  const [calendarKey, setCalendarKey] = useState(0)

  useEffect(
    () => {
      setCalendarKey(prev => prev + 1)
    },
    [selectedMonth, selectedYear]
  )

  const formattedDate = getFormattedDate(selectedYear, selectedMonth)

  return (
    <Calendar
      key={calendarKey}
      current={formattedDate}
      onDayPress={onPressDay}
      markedDates={{
        [selectedDate]: {
          selected: true,
          selectedColor: '#C3A6FF'
        }
      }}
      renderHeader={() => null}
      scrollEnabled={false}
      hideArrows
      theme={{
        selectedDayBackgroundColor: '#C3A6FF',
        todayTextColor: '#C3A6FF'
      }}
    />
  )
}

export default CalendarView
