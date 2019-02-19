import {TestAction} from "../actions/TestAction";
import {Utils} from "../utils/Utils";
import {TaskModel} from "../model/TaskModel";

export class CloseHtmlPopup extends TestAction {

    private readonly taskModel: TaskModel;

    constructor(model: TaskModel) {
        super();
        //need only order from model
        this.taskModel = model;
    }

    execute(): void {
        console.log(`==> TASK: ${this.taskModel.order} STARTS, Action ==> CloseHtmlPopup`);
        const wrapper = Utils.getWrapper();
        if (wrapper.isPopupOpened && wrapper.isPopupOpened()) {
            wrapper.popupManager.currentPopup.close();
            console.log(`==> TASK: ${this.taskModel.order} , Action ==> POP_UP_CLOSED`);
        }
        console.log(`==> TASK: ${this.taskModel.order} ENDS`);
        this.runNext();
    }
}
