import { User } from "./models/User";
import { UserForm } from "./views/UserForm";
const collection = User.buildUserCollection();

const user = User.buildUser({ name: "name", age: 0 });

collection.on("change", () => {
  console.log(collection);
});

const root = document.getElementById("root");

if (root) {
  const userForm = new UserForm(root, user);
  userForm.render();
}
