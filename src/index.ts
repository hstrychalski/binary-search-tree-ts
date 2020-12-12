import {Tree as BSTree} from "./btree/Tree";
import {RootNode} from "./btree/RootNode";

let rootNode = new RootNode(10, null, null);
let tree = new BSTree(rootNode);
tree.insert(8);
tree.insert(11);
tree.insert(11);
tree.insert(12);
tree.insert(3);
tree.insert(5);
tree.insert(7);
tree.insert(2);
console.log(tree);
