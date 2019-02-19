import {TestAction} from "../actions/TestAction";
import {TaskModel} from "../model/TaskModel";

export class ScrollPaytableByStepAction extends TestAction {
    protected _scrollSteps: number;

    private readonly taskModel: TaskModel;

    constructor(model: TaskModel) {
        super();
        this.taskModel = model;
        // pars "value" as scroll steps
        this._scrollSteps = this.taskModel.value;
    }

    protected start(): void {
        console.log(`==> TASK: ${this.taskModel.order} STARTS, Action ==> ScrollPaytableAction`);
        if (window['c_scroller']) {
            const scrollValueY: number = window['c_scroller']['scrollStep'] * this._scrollSteps;
            window['c_scroller']['setContentPos'](0, -scrollValueY);
            console.log(`==> TASK: ${this.taskModel.order} ENDS, at ${this._scrollSteps} scroll steps`);
        } else if (document.getElementsByClassName('window-content')[0]) {
            let pageOffsetHeight = document.getElementsByClassName('window-content')[0]['offsetHeight'];
            pageOffsetHeight = Math.max(0, pageOffsetHeight - 100);
            document.getElementsByClassName('window-content')[0].scrollTop += pageOffsetHeight;
            console.log(`==> TASK: ${this.taskModel.order} ENDS, at ${pageOffsetHeight}px`);
        }

        this.runNext();
    }

}
