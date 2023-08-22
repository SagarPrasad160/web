import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";
const collection = User.buildUserCollection();

const user = User.buildUser({ name: "name", age: 0 });

collection.on("change", () => {
  console.log(collection);
});

const root = document.getElementById("root");

if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
}
