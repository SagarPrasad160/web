import { AxiosPromise, AxiosResponse } from "axios";

interface Attributes<T, K> {
  get<K extends keyof T>(key: K): T[K];
  set(attrs: T): void;
  getAll(): T;
}

interface Eventing {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface ApiSync<T> {
  fetch(id: hasId): AxiosPromise;
  save(attrs: T): AxiosPromise;
}

interface hasId {
  id?: number;
}

export class Model<T extends hasId, K> {
  constructor(
    private events: Eventing,
    private attributes: Attributes<T, K>,
    private sync: ApiSync<T>
  ) {}

  get get() {
    return this.attributes.get;
  }
  set(update: T) {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  get on() {
    return this.events.on;
  }
  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    const id = this.attributes.get("id");
    if (typeof id === "number") {
      this.sync.fetch({ id }).then((res: AxiosResponse) => {
        this.set(res.data);
      });
    } else {
      throw new Error("Cannot fetch without id");
    }
  }
  save(): void {
    const data = this.attributes.getAll();
    this.sync.save(data).then((res) => {
      this.set(res.data);
    });
  }
}
