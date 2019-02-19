import {TestAction} from "../actions/TestAction";
import {Utils} from "../utils/Utils";
import {TaskModel} from "../model/TaskModel";

export class OpenHtmlPaytable extends TestAction {
    protected _target: string;
    protected _isMobile: boolean;
    private readonly taskModel: TaskModel;
    constructor(model: TaskModel) {
        super();
        //parse "target" as device detected
        this.taskModel = model;
        this._isMobile = this.taskModel.target === 'mobile';
    }

    execute(): void {
        console.log(`==> TASK: ${this.taskModel.order} STARTS, Action ==> OpenHtmlPaytable, (${this._isMobile ? 'mobile' : 'desktop'})`);
        const wrapper = Utils.getWrapper();
        const htmlPaytableButton = this.getHtmlTargetButton(wrapper);
        let wrapperEventClick = wrapper.device.event.click;

        if (this._isMobile) {
            wrapper.openMenu();
            wrapperEventClick = wrapper.device.event.up;
        }

        setTimeout(() => {
            htmlPaytableButton.dispatchEvent(new Event(wrapperEventClick));
            console.log(`==> TASK: ${this.taskModel.order} ENDS`);
            this.runNext();
        }, 1000);
    }

    protected getHtmlTargetButton(wrapper: any): any {
        if (this._isMobile) {
            return wrapper.menu.mobileElements.paytableButton;
        } else {
            return wrapper.menu.infoButton;
        }
    }
}
