import React, { createContext, useEffect, useState } from 'react';

import { Participant } from './api'
import { VideoService, HTTPVideoService } from './VideoService'

interface VideoCallContextValue {
  participants?: Participant[]
}

export const VideoCallContext = createContext<VideoCallContextValue | undefined>(undefined)

interface VideoCallProviderProps {
  videoService?: VideoService
}

export const VideoCallProvider: React.FC<VideoCallProviderProps> = (props) => {
  const { videoService = HTTPVideoService } = props

  // minimalny setup, w którym brakuje `cancel`, obsługi błędów itp.
  // koncentrujemy się jedynie na testach
  const [participants, setParticipants] = useState<Participant[]>()
  useEffect(() => {
    videoService.fetchParticipants()
      .then(setParticipants)
  }, [videoService])

  return <VideoCallContext.Provider value={{participants}}>
    {props.children}
  </VideoCallContext.Provider>
}
