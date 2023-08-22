import { View } from "./View";
import { User, UserProps } from "../models/User";

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
    <div>
      <h1>User Show</h1>
      <h3>Name: ${this.model.get("name")}</h3>
      <h3>Age: ${this.model.get("age")}</h3>  
    </div>
    `;
  }
}
