import { Eventing } from "./Eventing";
import { Attributes } from "./Attributes";
import { ApiSync } from "./ApiSync";
import { Collection } from "./Collection";

import { Model } from "./Model";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/user";

export class User extends Model<UserProps> {
  static buildUser(data: UserProps) {
    return new User(
      new Eventing(),
      new Attributes<UserProps>(data),
      new ApiSync<UserProps>(rootUrl)
    );
  }

  static buildUserCollection() {
    return new Collection<User, UserProps>(rootUrl, User.buildUser);
  }

  setRandomAge() {
    const age = Math.floor(Math.random() * 100);
    this.set({ age: age });
  }
}
