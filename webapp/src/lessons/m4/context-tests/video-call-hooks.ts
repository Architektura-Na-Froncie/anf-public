import { useContext } from "react"

import { VideoCallContext } from "./VideoCallProvider"

export const useParticipants = () => {
  const ctx = useContext(VideoCallContext)

  if (!ctx){
    throw new Error('Component beyond VideoCallContext!')
  }

  return ctx.participants
}
