import { useCallback, useContext, useState, ReactNode } from 'react'
import { createContext } from 'react'

const EventContext = createContext()

const EventProvider = ({ children }) => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [eventType, setEventType] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const eventData = {
    title,
    location,
    eventType,
    startTime,
    endTime
  }

  const handleEventData = useCallback((stepLabel, data) => {
    switch (stepLabel) {
      case 'title':
        setTitle(data)
        break
      case 'location':
        setLocation(data)
        break
      case 'eventType':
        setEventType(data)
        break
      case 'startTime':
        setStartTime(data)
        break
      case 'endTime':
        setEndTime(data)
        break
      default:
    }
  }, [])

  return (
    <EventContext.Provider value={{ eventData, handleEventData }}>
      {children}
    </EventContext.Provider>
  )
}

// const useEventContext = (): EventContextType => {
//   const context = useContext(EventContext);
//   if (!context) {
//     throw new Error("useEventContext must be used within a StepProvider");
//   }
//   return context;
// };

const useEventContext = () => useContext(EventContext)

export { EventProvider, useEventContext }
