import React, { memo } from 'react';
import { render } from "@testing-library/react";

import { useParticipants } from './video-call-hooks';
import { Participant } from './api';

interface VideoCallParticipantsProps {
  participants: Participant[]
}

/**
 * 🔥 rozbijamy komponent na 2 osobne: prezentacyjny + connected
 */
export const VideoCallParticipants: React.FC<VideoCallParticipantsProps> = memo((props) => {
  const { participants } = props
  return participants ? <ul>
    {participants.map(p => <li key={p.id}>{p.name}</li>)}
  </ul> : null
})

export const VideoCallParticipantsConnected: React.FC = (props) => {
  const participants = useParticipants()
  return participants
    ? <VideoCallParticipants participants={participants} />
    : null
}

const participantsData: Participant[] = [{
  id: 1,
  name: 'Paul',
}, {
  id: 2,
  name: 'John',
}, {
  id: 3,
  name: 'George',
}, {
  id: 4,
  name: 'Ringo',
}]

describe('VideoCallParticipants (connected-components)', () => {
  /**
   * 🔥 UWAGA!
   * 
   * w tym teście kontekst NIE bierze udziału
   * cel: chcielibyśmy przetestować funkcjonalności komponentu
   * a że ten komponent swoje dane ciągnie z kontekstu, to decydujemy się na rozbicie go:
   * rodzic/connected subskrybuje na kontekst, a dziecko/presentational jest pure
   * 
   * Dzięki temu testujemy komponent "bez balastu"
   * Ale gdybyśmy chcieli przetestować komponent RAZEM Z kontekstem, to lepiej wybrać inne podejście
   */
  it('should display list of participants passed from props (no context in this test)', () => {
    const { getByText } = render(<VideoCallParticipants participants={participantsData} />)
    for (const name of ['Paul', 'John', 'Ringo', 'George']) {
      getByText(name)
    }
  });
});
