import {TestModel} from "../model/TestModel";

export abstract class TestAction {
    private nextAction: TestAction;

    public execute(): void {
        /*const interval = setInterval(() => {
            if (TestModel.isTestCanBeExecute) {
                clearInterval(interval);
                this.start();
            }
        }, 1000);*/
        this.start();
    }

    protected runNext(): void {
        if (this.nextAction) {
            const action: TestAction = this.nextAction;
            this.nextAction = null;
            action.execute();
        } else {
            console.log("==> (: All tests has been pass :) ");
        }
    }

    protected start(): void {

    }

    public set next(nextAction: TestAction) {
        this.nextAction = nextAction;
    }
}
