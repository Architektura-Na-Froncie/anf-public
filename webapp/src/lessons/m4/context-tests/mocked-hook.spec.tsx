import React from 'react';
import { render } from "@testing-library/react";

jest.mock('./video-call-hooks', () => ({
  useParticipants: () => [{
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
}))

import { useParticipants } from './video-call-hooks';

interface VideoCallParticipantsProps {}

export const VideoCallParticipants: React.FC<VideoCallParticipantsProps> = (props) => {
  const participants = useParticipants()
  return participants ? <ul>
    {participants.map(p => <li key={p.id}>{p.name}</li>)}
  </ul> : null
}

describe('VideoCallParticipants (mocked-hook)', () => {
  /**
   * 🔥 UWAGA!
   * 
   * bez opakowania komponentu w kontekst - i bez mockowania hooka
   * poniższy komponent huknąłby takim błędem:
   * (sprawdź, komentując jest.mock powyżej)
   * 
   *   ● VideoCallParticipants › should display list of participants fetched from context
   *      Component beyond VideoCallContext!
   */
  it('should display list of participants fetched from context', () => {
    const { getByText } = render(<VideoCallParticipants />)
    for (const name of ['Paul', 'John', 'Ringo', 'George']) {
      getByText(name)
    }
  });
});
