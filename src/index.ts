import { User } from "./models/User";
import { UserList } from "./views/UserList";
const collection = User.buildUserCollection();

collection.fetch();

const root = document.getElementById("root");

if (root) {
  collection.on("change", () => {
    const userList = new UserList(root, collection.models);
    userList.render();
  });
} else {
  throw new Error("Root element does not exists.");
}
