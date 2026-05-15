export type SubscriberFn = (e: { type: string, message?: any }) => void;

export interface PubSub {
  subscribe(subFn: SubscriberFn): void;
  notify(type: string, message?: any): void;
}

class PubSubImpl implements PubSub {
  private subscribers: SubscriberFn[] = [];
  private lastEvent?: { type: string, message?: any };

  subscribe(subFn: SubscriberFn) {
    this.subscribers.push(subFn);
    if (this.lastEvent) {
      subFn(this.lastEvent);
    }
    return () => {
      const idx = this.subscribers.findIndex(fn => fn === subFn);
      if (idx !== -1) {
        this.subscribers.splice(idx, 1);
      }
    }
  }

  notify(type: string, message: any) {
    const event = { message, type };
    this.lastEvent = event;
    this.subscribers.forEach(subFn => subFn(event));
  }
}

export const pubsub = new PubSubImpl();

declare global {
  interface Window {
    PubSub: PubSub;
  }
}

window.PubSub = pubsub;
