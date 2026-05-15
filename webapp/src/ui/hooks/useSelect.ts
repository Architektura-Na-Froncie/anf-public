import { useState, ChangeEvent, useDebugValue } from 'react'

export const useSelect = (initial: string, onChanged: (key: string) => void) => {
  const [value, setValue] = useState(initial)

  const setValueFromEvent = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value
    setValue(newValue)
    onChanged(newValue)
  }

  useDebugValue('Select')

  return [value, setValueFromEvent] as const
}
