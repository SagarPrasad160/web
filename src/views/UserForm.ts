import { View } from "./View";
import { User, UserProps } from "../models/User";

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-name": this.onsetNameClick,
      "click:.set-age": this.onSetAgeClick,
      "click:.save-model": this.onSaveModelClick,
    };
  }

  onSaveModelClick = () => {
    this.model.save();
  };

  onsetNameClick = () => {
    const input = this.parent.querySelector("input");
    const name = input?.value;
    this.model.set({ name: name });
  };

  onSetAgeClick = () => {
    this.model.setRandomAge();
  };

  template() {
    return `
      <div>
        <input placeholder="${this.model.get("name")}" />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save</button>
      </div>
    `;
  }
}
