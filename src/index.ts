import {Tree as BSTree} from "./btree/Tree";
import {RootNode} from "./btree/RootNode";

export default {
    Tree: BSTree
}

let rootNode = new RootNode(20, null, null);
let tree = new BSTree(rootNode);
tree.insert(30);
tree.insert(1);
tree.insert(3);
tree.insert(35);
tree.insert(23);
tree.insert(26);
tree.insert(21);
tree.insert(22);

console.log(tree.preOrderTraversal(rootNode));
