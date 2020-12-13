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

    /**
     * Delete node with given value from tree/subtree
     * Start with a root node if no INode instance provided
     *
     * @param value
     * @param currentNode
     */
    delete(value: number, currentNode: INode|null): void {
        if (currentNode === null) {
            currentNode = this._rootNode;
        }
        this.performDeletionFromTree(value, currentNode);
    }

    findInOrderSuccessor(node: INode): INode {
        if (!node.RightChild) {
            throw new Error('Right node link is empty');
        }
        return this.findMinimumValueNodeInTree(node.RightChild);
    }

    findMinimumValueNodeInTree(node: INode): INode {
        if (node.LeftChild === null) {
            return node;
        }
        return this.findMinimumValueNodeInTree(node.LeftChild);
    }

    preOrderTraversal(rootNode: RootNode): INode[] {
        return this.preOrderTraversalRecursive(rootNode, [], []);
    }

    private preOrderTraversalRecursive(node: INode, stack: INode[], visitedNodes: INode[]): INode[] {
        while (node) { //visit left subtree first
            visitedNodes.push(node);
            if (node.RightChild) {
                stack.push(node);
            }
            //@ts-ignore
            node = node.LeftChild;
        }

        if (stack.length === 0) {
            return visitedNodes;
        }

        let poppedNode = stack.pop();

        //@ts-ignore
        return this.preOrderTraversalRecursive(poppedNode.RightChild, stack, visitedNodes);
    }

    private linkSubtreeToParent(node: INode, parent: INode): void {
        if (node.LeftChild) { //left subtree
            // @ts-ignore
            if (parent.Value > node.Value) { //current is left child of parent
                // @ts-ignore
                parent.LeftChild = node.LeftChild; //link subtree to parent
            } else { //current is right child of parent
                // @ts-ignore
                parent.RightChild = node.LeftChild;
            }
        } else if (node.RightChild){
            // @ts-ignore
            if (parent.Value > node.Value) { //current is left child of parent
                // @ts-ignore
                parent.LeftChild = node.RightChild; //link subtree to parent
            } else { //current is right child of parent
                // @ts-ignore
                parent.RightChild = node.RightChild;
            }
        }
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
            let successor = this.findInOrderSuccessor(currentNode);
            currentNode.Value = successor.Value;

            if (currentNode.RightChild === successor) { //special case when right subtree is just one node
                currentNode.RightChild = null; //unlink successor
                return;
            }
            this.delete(successor.Value, currentNode.RightChild);
        }
    }

    private simpleDeletion(node: INode, parent: INode): void {
        if (parent.Value > node.Value) { //left child
            parent.LeftChild = null;
        } else { //right child
            parent.RightChild = null;
        }
    }
}
