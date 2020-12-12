import {INode} from "./INode";

export class Node implements INode{
    private _value: number
    private _leftChild: Node | null
    private _rightChild: Node | null

    constructor(value: number, leftChild: Node|null, rightChild: Node | null) {
        this._value = value;
        this._leftChild = leftChild;
        this._rightChild = rightChild;
    }

    public get LeftChild() {
        return this._leftChild;
    }

    public set LeftChild(child: Node | null) {
        this._leftChild = child;
    }

    public get RightChild() {
        return this._rightChild;
    }

    public set RightChild(child: Node | null) {
        this._rightChild = child;
    }

    public get Value() {
        return this._value;
    }

    public set Value(value: number) {
        this._value = value;
    }

    public isLeaf(): boolean {
        return this._leftChild === null && this._rightChild === null;
    }
}

