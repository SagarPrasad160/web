import { Model, hasId } from "../models/Model";

export abstract class View<T extends Model<K>, K extends hasId> {
  constructor(public parent: HTMLElement, public model: T) {
    this.bindModel();
  }

  abstract eventsMap(): { [key: string]: () => void };
  abstract template(): string;

  bindModel() {
    this.model.on("change", () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment) {
    const events = this.eventsMap();
    for (let key in events) {
      const [event, selector] = key.split(":");
      fragment.querySelectorAll(selector).forEach((el) => {
        el.addEventListener(event, events[key]);
      });
    }
  }

  render() {
    this.parent.innerHTML = "";
    const template = document.createElement("template");
    template.innerHTML = this.template();
    // attach event listeners
    this.bindEvents(template.content);
    // append template content in the parent element of UserForm instance
    this.parent.append(template.content);
  }
}
