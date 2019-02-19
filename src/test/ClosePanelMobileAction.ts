import {TestAction} from "../actions/TestAction";
import {PanelMobileTarget} from "../enum/PanelMobileTarget";
import {TaskModel} from "../model/TaskModel";

export class ClosePanelMobileAction extends TestAction {
    private _isLandscape: boolean;

    private readonly taskModel: TaskModel;
    constructor(model: TaskModel) {
        super();
        //parse 'target' as component view
        this.taskModel = model;
    }

    protected start(): void {
        console.log(`==> TASK: ${this.taskModel.order} STARTS, Action ==> ClosePanelMobileAction, ${this.taskModel.target}`);
        this._isLandscape = window['c_bottomBar'].isLandscape;
        this.openTargetPanel();
        this.runNext();
    }

    protected openTargetPanel(): void {
        switch (this.taskModel.target) {
            case PanelMobileTarget.TOTAL_BET: {
                window['c_bottomBar'].closeTotalBet(this._isLandscape, this._isLandscape);
                console.log(`==> TASK: ${this.taskModel.order} , ${this.taskModel.target} CLOSED`);
                break;
            }
            case PanelMobileTarget.AUTO_PLAY: {
                window['c_bottomBar'].closeAutoPlay(this._isLandscape, this._isLandscape);
                console.log(`==> TASK: ${this.taskModel.order} , ${this.taskModel.target} CLOSED`);
                break;
            }
        }
        console.log(`==> TASK: ${this.taskModel.order} ENDS`);
    }
}
