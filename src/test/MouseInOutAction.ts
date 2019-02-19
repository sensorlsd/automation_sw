import {TestAction} from "../actions/TestAction";
import {TaskModel} from "../model/TaskModel";

export class MouseInOutAction extends TestAction {
    protected _target: string;
    protected _event: string;
    private readonly taskModel: TaskModel;
    constructor(model: TaskModel) {
        super();
        //parse "target" as view componets
        //parse "type" as event
        this.taskModel = model;
    }

    protected start(): void {
        console.log(`==> TASK: ${this.taskModel.order} STARTS, Action ==> MouseInOutAction, ${this.taskModel.type}`);
        const mouseInOutEvent = window[this.taskModel.target]._events[this.taskModel.type];
        mouseInOutEvent.fn.call(mouseInOutEvent.context);
        setTimeout(() => {
            console.log(`==> TASK: ${this.taskModel.order} ENDS`);
            this.runNext();
        }, 3000);
    }
}
