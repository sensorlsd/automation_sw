import {TestAction} from "../actions/TestAction";
import {TaskModel} from "../model/TaskModel";

export class DelayTask extends TestAction {

    private readonly taskModel: TaskModel;
    constructor(model: TaskModel) {
        super();
        //parse "value" as time delay
        this.taskModel = model;
    }

    protected start(): void {
        console.log(`==> TASK: ${this.taskModel.order} STARTS, Action ==> DelayTask, ${this.taskModel.value}`);
        setTimeout(() => {
            console.log(`==> TASK: ${this.taskModel.order} ENDS`);
            this.runNext();
        }, this.taskModel.value);
    }
}
