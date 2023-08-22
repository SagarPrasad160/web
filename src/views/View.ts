import { Model, hasId } from "../models/Model";

export abstract class View<T extends Model<K>, K extends hasId> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  regionsMap(): { [key: string]: string } {
    return {};
  }

  regions: { [key: string]: Element } = {};

  eventsMap(): { [key: string]: () => void } {
    return {};
  }
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

  mapRegions(fragment: DocumentFragment) {
    const regionsMap = this.regionsMap();
    for (let region in regionsMap) {
      const selectorEl = fragment.querySelector(regionsMap[region]);
      if (selectorEl) {
        this.regions[region] = selectorEl;
      }
    }
  }

  onRender(): void {}

  render() {
    this.parent.innerHTML = "";
    const template = document.createElement("template");
    template.innerHTML = this.template();
    // attach event listeners
    this.bindEvents(template.content);
    // fill the regions value of the instance by mapping over the regionsMap value
    this.mapRegions(template.content);
    // render the child element of the View's instance
    this.onRender();
    // append template content in the parent element of View's instance
    this.parent.append(template.content);
  }
}
