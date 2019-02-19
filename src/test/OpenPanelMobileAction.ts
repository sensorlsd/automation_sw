import {TestAction} from "../actions/TestAction";
import {PanelMobileTarget} from "../enum/PanelMobileTarget";
import {TaskModel} from "../model/TaskModel";

export class OpenPanelMobileAction extends TestAction {
    private _isLandscape: boolean;
    private readonly taskModel: TaskModel;

    constructor(model: TaskModel) {
        super();
        //parse "target" as view component
        this.taskModel = model;
    }
    protected start(): void {
        console.log(`==> TASK: ${this.taskModel.order} STARTS, Action ==> OpenPanelMobileAction, ${this.taskModel.target}`);
        this._isLandscape = window['c_bottomBar'].isLandscape;
        this.openTargetPanel();
        this.runNext();
    }

    protected openTargetPanel(): void {
        switch (this.taskModel.target) {
            case PanelMobileTarget.TOTAL_BET: {
                window['c_bottomBar'].openTotalBet(this._isLandscape, this._isLandscape);
                console.log(`==> TASK: ${this.taskModel.order} , ${this.taskModel.target} OPEND`);
                break;
            }
            case PanelMobileTarget.AUTO_PLAY: {
                window['c_bottomBar'].openAutoPlay(this._isLandscape, this._isLandscape);
                console.log(`==> TASK: ${this.taskModel.order} , ${this.taskModel.target} OPEND`);
                break;
            }
        }
        console.log(`==> TASK: ${this.taskModel.order} ENDS`);
    }
}
