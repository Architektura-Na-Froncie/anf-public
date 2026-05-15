import React from 'react';
import { render } from "@testing-library/react";

import { useParticipants } from './video-call-hooks';
import { VideoCallProvider } from './VideoCallProvider';
import { MockVideoService } from './VideoService';

interface VideoCallParticipantsProps {}

export const VideoCallParticipants: React.FC<VideoCallParticipantsProps> = (props) => {
  const participants = useParticipants()
  return participants ? <ul>
    {participants.map(p => <li key={p.id}>{p.name}</li>)}
  </ul> : null
}

const fakeHTTP = async () => [{
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

describe('VideoCallParticipants (parametrized context)', () => {
  /**
   * 🔥 UWAGA!
   * 
   * W teście uczestniczy prawdziwy kontekst + komponent, który go subskrybuje
   * 🔥 jeśli można, najprostsze rozwiązanie to zamockować call HTTP (np. jest.mock)
   * 
   * Ale jeśli zależności jest dużo więcej (np. 5 calli HTTP + jeszcze dodatkowe websockety)
   * to może być łatwiej sparametryzować kontekst - tak jak poniżej
   * (niż pisać litanię N wywołań jest.mock - mockowy serwis byłby jednym, spójnym elementem)
   */
  it('should display list of participants fetched from context', async () => {
    const mockService = new MockVideoService();
    mockService.fetchParticipants.mockImplementation(fakeHTTP)

    const { findByText } = render(<VideoCallProvider videoService={mockService}>
      <VideoCallParticipants />
    </VideoCallProvider>)

    for (const name of ['Paul', 'John', 'Ringo', 'George']) {
      await findByText(name)
    }
    // opcjonalnie
    expect(mockService.fetchParticipants).toHaveBeenCalledTimes(1)
    // expect(mockService.fetchParticipants.mock.calls).toMatchInlineSnapshot()
  });
});
