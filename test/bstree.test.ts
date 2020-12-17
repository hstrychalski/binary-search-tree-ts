import {RootNode} from "../src/btree/RootNode";
import {Node} from "../src/btree/Node";
import {Tree as BSTree} from "../src/btree/Tree";

describe('Nodes are inserted correctly', () => {
   let tree = createTree(
       200,
       [300, 100, 20, 90, 46, 115, 30, 3, 400, 220],
   );
   expect(tree).toBeInstanceOf(BSTree);
   let rootNode = tree.search(200);
   expect(rootNode).toBeInstanceOf(RootNode);
   //@ts-ignore
   let node100 = rootNode.LeftChild;
   //@ts-ignore
    expect(node100).toBeInstanceOf(Node);
    //@ts-ignore
    expect(node100.Value).toEqual(100);

    //@ts-ignore
    let node115 = node100.RightChild;
    //@ts-ignore
    expect(node115).toBeInstanceOf(Node);
    //@ts-ignore
    expect(node115.Value).toEqual(115);
    //@ts-ignore
    expect(node115.isLeaf()).toEqual(true)

    //@ts-ignore
    let node20 = node100.LeftChild;
    //@ts-ignore
    expect(node20).toBeInstanceOf(Node);
    //@ts-ignore
    expect(node20.Value).toEqual(20);

    //@ts-ignore
    let node3 = node20.LeftChild;
    //@ts-ignore
    expect(node3).toBeInstanceOf(Node);
    //@ts-ignore
    expect(node3.Value).toEqual(3);
    //@ts-ignore
    expect(node3.isLeaf()).toEqual(true)

    //@ts-ignore
    let node90 = node20.RightChild;
    //@ts-ignore
    expect(node90).toBeInstanceOf(Node);
    //@ts-ignore
    expect(node90.RightChild).toBeNull();
    //@ts-ignore
    expect(node90.Value).toEqual(90);

    //@ts-ignore
    let node46 = node90.LeftChild;
    expect(node46).toBeInstanceOf(Node);
    //@ts-ignore
    expect(node46.Value).toEqual(46);
    //@ts-ignore
    expect(node46.RightChild).toBeNull();

    //@ts-ignore
    let node30 = node46.LeftChild;
    expect(node30).toBeInstanceOf(Node);
    //@ts-ignore
    expect(node30.Value).toEqual(30);
    //@ts-ignore
    expect(node30.RightChild).toBeNull();

    //RIGHT SUBTREE:
    //@ts-ignore
    let node300 = rootNode.RightChild;
    expect(node300).toBeInstanceOf(Node);
    //@ts-ignore
    expect(node300.Value).toEqual(300);

    //@ts-ignore
    let node220 = node300.LeftChild;
    expect(node220).toBeInstanceOf(Node);
    //@ts-ignore
    expect(node220.Value).toEqual(220);
    //@ts-ignore
    expect(node220.isLeaf()).toEqual(true);

    //@ts-ignore
    let node400 = node300.RightChild;
    expect(node400).toBeInstanceOf(Node);
    //@ts-ignore
    expect(node400.Value).toEqual(400);
    //@ts-ignore
    expect(node400.isLeaf()).toEqual(true);
});


describe('Tree search returns proper result', () => {
    let tree = createTree(
        20,
        [30, 1, 3, 35, 23, 26, 21, 22]
    );
    it('Returns proper Node instance when it exists in tree vol 1', () => {
        let node = tree.search(35);
        expect(node).toBeInstanceOf(Node)
        //@ts-ignore
        expect(node.Value).toEqual(35);
        //@ts-ignore
        expect(node.isLeaf()).toEqual(true);
        //@ts-ignore
        expect(node.RightChild).toBeNull();
        //@ts-ignore
        expect(node.LeftChild).toBeNull();
    });
    it('Returns proper Node instance when it exists in tree vol 2', () => {
        let node = tree.search(23);
        expect(node).toBeInstanceOf(Node)
        //@ts-ignore
        expect(node.Value).toEqual(23);
        //@ts-ignore
        expect(node.LeftChild).toBeInstanceOf(Node);
        //@ts-ignore
        expect(node.LeftChild.Value).toEqual(21);
        //@ts-ignore
        expect(node.RightChild).toBeInstanceOf(Node);
        //@ts-ignore
        expect(node.RightChild.Value).toEqual(26);
    });
    it('Returns proper Node instance when it exists in tree vol 3', () => {
        let node = tree.search(1);
        expect(node).toBeInstanceOf(Node)
        //@ts-ignore
        expect(node.Value).toEqual(1);
        //@ts-ignore
        expect(node.LeftChild).toBeNull();
        //@ts-ignore
        expect(node.RightChild).toBeInstanceOf(Node);
        //@ts-ignore
        expect(node.RightChild.Value).toEqual(3);
    });
    it('Returns proper node when root node value is given', () => {
        let node = tree.search(20);
        expect(node).toBeInstanceOf(RootNode);
    });
    it('Returns null when value does not exist in tree', () => {
        let node = tree.search(99999);
        expect(node).toBeNull();
    });
});

describe('findInorderSuccessor returns proper in order successorNode', () => {
    let tree = createTree(
        200,
        [300, 100, 20, 90, 46, 115, 30, 3, 400, 220],
    );
    let node = tree.search(3);
    let expectedSuccessor = tree.search(20);
    //@ts-ignore
    let result = tree.findInOrderSuccessor(node);
    expect(result).toEqual(expectedSuccessor);
});

function createTree(rootValue: number, values: number[]) {
    let rootNode = new RootNode(rootValue, null, null);
    let tree = new BSTree(rootNode);
    values.forEach((value) => {
        tree.insert(value);
    });
    return tree;
}
