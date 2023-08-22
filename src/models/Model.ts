import { AxiosPromise, AxiosResponse } from "axios";

import { Eventing } from "./Eventing";
import { Attributes } from "./Attributes";
import { ApiSync } from "./ApiSync";

export interface hasId {
  id?: number;
}

export class Model<T extends hasId> {
  constructor(
    private events: Eventing,
    private attributes: Attributes<T>,
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
