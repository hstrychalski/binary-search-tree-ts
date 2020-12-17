import {RootNode} from "../src/btree/RootNode";
import {Node} from "../src/btree/Node";
import {Tree as BSTree} from "../src/btree/Tree";

describe('Tree search returns proper result', () => {
    let tree = createTree(
        20,
        [30, 1, 3, 35, 23, 26, 21, 22]
    );
    it('Returns proper Node instance when it exists in tree', () => {
        let node = tree.search(35);
        expect(node).toBeInstanceOf(Node)
        // expect((1+ 1)).toEqual(2);
    });
    it('Returns null when value does not exist in tree', () => {
        let node = tree.search(99999);
        expect(node).toBeNull();
    });
});

function createTree(rootValue: number, values: number[]) {
    let rootNode = new RootNode(rootValue, null, null);
    let tree = new BSTree(rootNode);
    values.forEach((value) => {
        tree.insert(value);
    });
    return tree;
}
