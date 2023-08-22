import { User } from "./models/User";
import { CollectionView } from "./views/CollectionView";
const collection = User.buildUserCollection();

collection.fetch();

const root = document.getElementById("root");

if (root) {
  collection.on("change", () => {
    const collectionView = new CollectionView(root, collection.models);
    collectionView.render();
  });
} else {
  throw new Error("Root element does not exists.");
}
