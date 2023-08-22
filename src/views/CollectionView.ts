import { Model, hasId } from "../models/Model";

export abstract class CollectionView<T extends Model<K>, K extends hasId> {
  constructor(public parent: Element, public models: T[]) {}

  abstract renderItem(model: T): string;

  abstract template(): string;

  render() {
    this.parent.innerHTML = "";
    const template = document.createElement("template");
    template.innerHTML = this.template();
    this.parent.append(template.content);
  }
}
