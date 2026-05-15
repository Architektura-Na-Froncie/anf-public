import { MiddlewareAPI, Dispatch, Action } from "redux";
import io from 'socket.io-client';

import { COLLABORATIVE_SVC_URL } from "./config";

export const collaborativeMiddleware = (store: MiddlewareAPI) => {
  // połącz się z websocketem
  const socket = io(COLLABORATIVE_SVC_URL)

  // otrzymywanie akcji z zewnątrz
  // socket.on('action', (action: Action) => { /* ... */ })

  // wysyłanie akcji stworzonych lokalnie
  // socket.emit('action', action)

  return (next: Dispatch<Action>) => (action: Action) => {
    // ...
    return next(action);
  }
}
