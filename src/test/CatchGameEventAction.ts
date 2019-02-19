import {TestAction} from "../actions/TestAction";
import {TaskModel} from "../model/TaskModel";

export class CatchGameEventAction extends TestAction {
    private readonly taskModel: TaskModel;
    constructor(model: TaskModel) {
        super();
        //parse 'target' as event type
        this.taskModel = model;
    }

    protected start(): void {
        console.log(`==> TASK: ${this.taskModel.order} STARTS, Action ==> CatchGameEventAction, ${this.taskModel.target}`);
        this.tryToRun();
    }

    protected tryToRun(): void {
        if (this.hasSomeView()) {
            this.run();
        } else {
            setTimeout(() => {
                this.tryToRun();
            }, 500);
        }
    }

    protected run(): void {
        this.getCurrentViewComponent().dispatcher.addListener(/*name, fn, context*/
            this.taskModel.target,
            () => {
                console.log(`==> TASK: ${this.taskModel.order} ENDS`);
                this.runNext();
            },
            this
        );
    }

    private hasSomeView(): boolean {
        return !!this.getCurrentViewComponent();
    }

    private getCurrentViewComponent(): any {
        return window['c_gameSceneMobile'] || window['c_gameSceneDesktop'] || window['c_startScene'] || window['c_sceneGroup'];
    }
}
