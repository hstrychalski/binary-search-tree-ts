import {Node} from "./Node";
import {RootNode} from "./RootNode";
import {INode} from "./INode";

export class Tree {
    private _rootNode: RootNode;

    constructor(rootNode: RootNode) {
        this._rootNode = rootNode;
    }

    insert(value: number): void {
        let node = new Node(value, null, null);
        let currentlyVisitedNode = this._rootNode;

        do {
            if (value < currentlyVisitedNode.Value) {
                if (!currentlyVisitedNode.LeftChild) {
                    currentlyVisitedNode.LeftChild = node;
                    return;
                } else {
                    // @ts-ignore
                    currentlyVisitedNode = currentlyVisitedNode.LeftChild;
                }
            } else {
                if (!currentlyVisitedNode.RightChild) {
                    currentlyVisitedNode.RightChild = node;
                    return
                } else {
                    // @ts-ignore
                    currentlyVisitedNode = currentlyVisitedNode.RightChild;
                }
            }
        } while (1)
    }

    delete(value: number, currentNode: INode|null): void {
        if (currentNode === null) {
            currentNode = this._rootNode;
        }
        this.performDeletionFromTree(value, currentNode);
    }

    private performDeletionFromTree(value: number, currentNode: INode): void {
        let parent = null;
        while (currentNode.Value !== value) {
            if (value < currentNode.Value) {
                parent = currentNode;
                // @ts-ignore
                currentNode = currentNode.LeftChild;
            } else {
                parent = currentNode;
                // @ts-ignore
                currentNode = currentNode.RightChild;
            }

            if (currentNode.Value !== value &&
                currentNode.LeftChild === null && currentNode.RightChild === null
            ) {
                throw new Error('Node with value: ' + value + ' not found');
            }
        }

        //TODO handle root node removal

        if (!currentNode.LeftChild && !currentNode.RightChild) { //no subtrees - simple deletion
            // @ts-ignore
            this.simpleDeletion(currentNode, parent);
            return;
        }

        if (( currentNode.LeftChild || currentNode.RightChild ) &&
            !( currentNode.LeftChild && currentNode.RightChild)
        ) { //one subtree - left or right
            // @ts-ignore
            this.linkSubtreeToParent(currentNode, parent);
        }

        if (currentNode.LeftChild && currentNode.RightChild) {
            let successor = this.findMinimumValueNodeInTree(currentNode.RightChild);
            // @ts-ignore
            if (parent.Value > currentNode.Value) { //left child
                // @ts-ignore
                parent.LeftChild = successor;
            } else { //right child
                // @ts-ignore
                parent.RightChild = successor;
            }
            this.delete(successor.Value, currentNode.RightChild);
        }
    }

    private linkSubtreeToParent(node: INode, parent: INode): void {
        if (node.LeftChild) { //left subtree
            // @ts-ignore
            if (parent.Value > currentNode.Value) { //current is left child of parent
                // @ts-ignore
                parent.LeftChild = currentNode.LeftChild; //link subtree to parent
            } else { //current is right child of parent
                // @ts-ignore
                parent.RightChild = currentNode.LeftChild;
            }
        } else if (node.RightChild){
            // @ts-ignore
            if (parent.Value > currentNode.Value) { //current is left child of parent
                // @ts-ignore
                parent.LeftChild = currentNode.RightChild; //link subtree to parent
            } else { //current is right child of parent
                // @ts-ignore
                parent.RightChild = currentNode.RightChild;
            }
        }
    }

    private simpleDeletion(node: INode, parent: INode): void {
        if (parent.Value > node.Value) { //left child
            parent.LeftChild = null;
        } else { //right child
            parent.RightChild = null;
        }
    }


    search(value: number): INode|null {
        let currentNode = this._rootNode;
        while (currentNode.Value !== value) {
            if (value < currentNode.Value) {
                // @ts-ignore
                currentNode = currentNode.LeftChild;
            } else {
                // @ts-ignore
                currentNode = currentNode.RightChild;
            }

            if (currentNode.Value !== value &&
                currentNode.LeftChild === null && currentNode.RightChild === null
            ) {
                return null;
            }
        }
        return currentNode;
    }

    findMinimumValueNodeInTree(node: INode): INode {
        if (node.LeftChild === null) {
            return node;
        }
        return this.findMinimumValueNodeInTree(node.LeftChild);
    }
}
