import { Eventing } from "./Eventing";
import { Attributes } from "./Attributes";
import { ApiSync } from "./ApiSync";

import { Model } from "./Model";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

type Keys = "id" | "name" | "age";

const rootUrl = "http://localhost:3000/user";

export class User extends Model<UserProps, Keys> {
  static buildUser(data: UserProps) {
    return new User(
      new Eventing(),
      new Attributes<UserProps>(data),
      new ApiSync<UserProps>(rootUrl)
    );
  }
}
