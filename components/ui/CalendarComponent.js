import React, { useState, useEffect } from 'react'
import { Calendar, CalendarList } from 'react-native-calendars'
import { getFormattedDate } from '../../helpers/date'

const CalendarComponent = ({
  selectedMonth,
  selectedYear,
  onPressDay,
  markedDates = {},
  setSelectedMonth,
  setSelectedYear
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

  const handleDayPress = day => {
    setSelectedDate(day.dateString)
    onPressDay(day)
  }

  // Об'єднуємо події та виділення вибраної дати
  const mergedMarkedDates = {
    ...markedDates,
    ...(selectedDate && {
      [selectedDate]: {
        ...(markedDates[selectedDate] || {}),
        selected: true,
        selectedColor: '#C3A6FF'
      }
    })
  }

  return (
    <Calendar
      key={calendarKey}
      current={formattedDate}
      onDayPress={handleDayPress}
      markedDates={mergedMarkedDates}
      renderHeader={() => null}
      scrollEnabled
      hideArrows
      enableSwipeMonths
      onMonthChange={month => {
        setSelectedMonth(month.month)
        setSelectedYear(month.year)
      }}
      theme={{
        selectedDayBackgroundColor: '#C3A6FF',
        todayTextColor: '#C3A6FF',
        dotColor: '#C3A6FF',
        selectedDotColor: '#ffffff'
      }}
    />

  )
}

export default CalendarComponent
