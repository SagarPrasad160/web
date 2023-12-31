import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(private rootUrl: string, private deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch() {
    axios.get(this.rootUrl).then((res: AxiosResponse) => {
      res.data.forEach((json: K) => {
        this.models.push(this.deserialize(json));
      });
      this.events.trigger("change");
    });
  }
}
