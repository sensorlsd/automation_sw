import {TestAction} from "../actions/TestAction";
import {Utils} from "../utils/Utils";
import {TaskModel} from "../model/TaskModel";
import {TestModel} from "../model/TestModel";

export class TestClickButton extends TestAction {
    private readonly taskModel: TaskModel;
    constructor(model: TaskModel) {
        super();
        //parse "target" as click event
        this.taskModel = model;
    }

    protected start(): void {
        console.log(`==> TASK: ${this.taskModel.order} STARTS, Action ==> TestClickButton, ${this.taskModel.target}`);
        const interval = setInterval(() => {
            const button: any = this.getButton();
            if (this.canBeClicked(button)) {
                this.click(button);
                clearInterval(interval);
                if (this.taskModel.target === "c_spinButton") {
                    const betAmount: number = this.getCurrentBetAmount();
                    TestModel.balanceAfterSpin = Utils.getWrapper()["viewBalance"] - betAmount;
                }
                console.log(`==> TASK: ${this.taskModel.order} ENDS, Action ==> TestClickButton, CLICKED`);
                this.runNext();
            } else {
                console.log(`==> TASK: ${this.taskModel.order} ENDS, Action ==> TestClickButton, CAN'T BE CLICKED`);
            }
        }, 1000);
    }

    protected canBeClicked(button: any): boolean {
        return button && (button.visible || this.isSpinComponentSgk(button));
    }

    protected click(button: any): void {
        const  deviceClickEventName = Utils.getWrapper().device.event.click;
        const eventClick = button._events[`${deviceClickEventName}`] || button._events.SPIN || button._events['ButtonEvent.CLICK'];
        if (eventClick) {
            eventClick.fn.call(eventClick.context);
        } else if (this.isSpinComponentSgk(button)) {
            this.clickSpinComponentSgk(button);
        } else {
            console.log(`==> TASK: ${this.taskModel.order} ENDS, Action ==> TestClickButton, NOT CORRECT "eventClick`);
        }
    }

    private getButton(): any {
        if (window[this.taskModel.target]['button']) {
            return window[this.taskModel.target]['button'];
        } else {
            return window[this.taskModel.target];
        }
    }

    private isSpinComponentSgk(button: any): boolean {
        //fixme: maybe is present some better way to check 'rambo UI'
        return button.parent && button.parent.name && button.parent.name === 'spinButton';
    }

    private clickSpinComponentSgk(button: any): void {
        button.parent._events.pointerdown.fn.call(button.parent._events.pointerdown.context);
        button.parent._events.pointerup.fn.call(button.parent._events.pointerup.context);
    }

    private getCurrentBetAmount(): number {
        let betAmount: number = 0;
        if (window["c_totalbetLabel"] && window["c_totalbetLabel"]["text"]) {
            betAmount = parseFloat(window["c_totalbetLabel"]["text"].replace(/[^\d.-]/g, ''));
        } else if (window["c_totalBetDesktop"] && window["c_totalBetDesktop"]["valueLabel"]["text"]) {
            betAmount = parseFloat(window["c_totalBetDesktop"]["valueLabel"]["text"].replace(/[^\d.-]/g, ''));
        }
        return betAmount;
    }
}
