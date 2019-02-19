export class TaskModel {
    protected _order: number;
    protected _type: string;
    protected _target: string;
    protected _value: number;
    protected _dataArray: Array<Array<number>>;

    get order(): number {
        return this._order;
    }

    set order(value: number) {
        this._order = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get target(): string {
        return this._target;
    }

    set target(value: string) {
        this._target = value;
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }

    get dataArray(): Array<Array<number>> {
        return this._dataArray;
    }

    set dataArray(value: Array<Array<number>>) {
        this._dataArray = value;
    }
}
