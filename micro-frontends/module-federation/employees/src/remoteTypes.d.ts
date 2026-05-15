declare module "@anf-mfe/pubsub" {
  export type SubscriberFn = (e: { type: string, message?: any }) => void;

  export interface PubSub {
    subscribe(subFn: SubscriberFn): void;
    notify(type: string, message?: any): void;
  }

  export const pubsub: PubSub;
}
