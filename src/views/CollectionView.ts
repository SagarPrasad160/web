import { Model } from "../models/Model";
import { UserProps } from "../models/User";

export class CollectionView<T extends Model<UserProps>> {
  constructor(public parent: Element, public models: T[]) {}

  renderItem(model: T) {
    return `
    <div>
      <h3>Name: ${model.get("name")}</h3>
      <h3>Age: ${model.get("age")}</h3>
    </div>
    `;
  }

  template() {
    return `
    <div class="collection">
        ${this.models
          .map((model: T) => {
            return this.renderItem(model);
          })
          .join("")}
    </div>
    `;
  }

  render() {
    this.parent.innerHTML = "";
    const template = document.createElement("template");
    template.innerHTML = this.template();
    this.parent.append(template.content);
  }
}
