type callback = () => void;

export class Eventing {
  events: { [key: string]: callback[] } = {};
  on = (eventName: string, callback: callback) => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  trigger = (eventName: string) => {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) {
      return;
    }
    handlers.forEach((callback) => callback());
  };
}
