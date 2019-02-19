import {TestAction} from "../actions/TestAction";
import {TestConfig} from "../config/TestConfig";
import {TestTypeEnum} from "../enum/TestTypeEnum";
import {TaskModel} from "../model/TaskModel";
import {CatchGameEventAction} from "../test/CatchGameEventAction";
import {CheatAction} from "../test/CheatAction";
import {CloseHtmlPopup} from "../test/CloseHtmlPopup";
import {ClosePanelMobileAction} from "../test/ClosePanelMobileAction";
import {DelayTask} from "../test/DelayTask";
import {MouseInOutAction} from "../test/MouseInOutAction";
import {OpenHtmlPaytable} from "../test/OpenHtmlPaytable";
import {OpenPanelMobileAction} from "../test/OpenPanelMobileAction";
import {PayoutCheckAction} from "../test/PayoutCheckAction";
import {ReloadAction} from "../test/ReloadAction";
import {ScreenShotAction} from "../test/ScreenShotAction";
import {ScrollPaytableByStepAction} from "../test/ScrollPaytableByStepAction";
import {TestClickButton} from "../test/TestClickButton";

export class Fabric {
    private static instance: Fabric;

    static getInstance() {
        if (!Fabric.instance) {
            Fabric.instance = new Fabric();
        }
        return Fabric.instance;
    }

    getInstance(type: TestTypeEnum, task: TaskModel, config: TestConfig): TestAction {
        switch (type) {
            case TestTypeEnum.CatchGameEvent: {
                return new CatchGameEventAction(task);
            }
            case TestTypeEnum.CheatAction: {
                return new CheatAction(task);
            }
            case TestTypeEnum.CloseHtmlPopup: {
                return new CloseHtmlPopup(task);
            }
            case TestTypeEnum.ClosePanelMobile: {
                return new ClosePanelMobileAction(task);
            }
            case TestTypeEnum.DelayTask: {
                return new DelayTask(task);
            }
            case TestTypeEnum.TestClickButton: {
                return new TestClickButton(task);
            }
            case TestTypeEnum.OpenHtmlPaytable: {
                return new OpenHtmlPaytable(task);
            }
            case TestTypeEnum.OpenPanelMobile: {
                return new OpenPanelMobileAction(task);
            }
            case TestTypeEnum.ScreenShotAction: {
                return new ScreenShotAction(task);
            }
            case TestTypeEnum.ScrollPaytableByStepAction: {
                return new ScrollPaytableByStepAction(task);
            }
            case TestTypeEnum.PayoutCheckAction:
            case TestTypeEnum.PayoutReadAction: {
                return new PayoutCheckAction(task);
            }
            case TestTypeEnum.MouseOutAction:
            case TestTypeEnum.MouseOverAction: {
                return new MouseInOutAction(task);
            }
            case TestTypeEnum.ReloadAction: {
                return new ReloadAction(config);
            }
            default: {
                console.error(`==> Fabric | unknown type ${type}`);
                return null;
            }
        }
    }
}
