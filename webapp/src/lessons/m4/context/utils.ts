import { useCallback, useState } from "react"

// this is a hook that trigger some changes in order to simulate changes within the app
export function useChangingState<T>(initialState: T){
  const [state, setState] = useState(initialState)

  const update = useCallback(() => {
    setState(currentState => ({ ...currentState }))
  }, [])

  return [state, update] as const
}
