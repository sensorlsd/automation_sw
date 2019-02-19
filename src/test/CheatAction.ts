import {TestAction} from "../actions/TestAction";
import {Utils} from "../utils/Utils";
import {TaskModel} from "../model/TaskModel";

export class CheatAction extends TestAction {
    private readonly taskModel: TaskModel;
    constructor(model: TaskModel) {
        super();
        //parse cheats data from 'dataArray'
        this.taskModel = model;
    }

    protected start(): void {
        console.log(`==> TASK: ${this.taskModel.order} STARTS, Action ==> CheatAction, ${this.taskModel.dataArray}`);

        if (this.taskModel.dataArray.length) {
            for (let i = 0; i < this.taskModel.dataArray.length; i++) {
                const cheat = this.taskModel.dataArray[i];
                Utils.getWrapper().cheat.inputField.value = JSON.stringify(cheat);
            }
        }

        Utils.getWrapper().cheat.sendCheat();
        console.log(`==> TASK: ${this.taskModel.order} ENDS`);
        this.runNext();
    }
}
