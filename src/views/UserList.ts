import { CollectionView } from "./CollectionView";
import { User, UserProps } from "../models/User";

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User) {
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
          .map((model: User) => {
            return this.renderItem(model);
          })
          .join("")}
    </div>
    `;
  }
}
