import {TaskModel} from "./TaskModel";
import {TestConfig} from "../config/TestConfig";

export class TestModel {
    private static instance: TestModel;
    public static balanceAfterSpin: number = 0;
    public static isTestCanBeExecute: boolean = true;
    private _config: TestConfig;

    static getInstance() {
        if (!TestModel.instance) {
            TestModel.instance = new TestModel();
        }
        return TestModel.instance;
    }

    private _tasks: TaskModel[] = [];

    get tasks(): TaskModel[] {
        return this._tasks;
    }

    get config(): TestConfig {
        return this._config;
    }

    set config(value: TestConfig) {
        this._config = value;
    }
}
