import {Node} from "./Node";

export interface INode {
    LeftChild: Node | null,
    RightChild: Node | null,
    Value: number
    isLeaf(): boolean;
}

