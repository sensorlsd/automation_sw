import {TestAction} from "../actions/TestAction";
import {TestTypeEnum} from "../enum/TestTypeEnum";
import {TaskModel} from "../model/TaskModel";
import {TestModel} from "../model/TestModel";
import {Fabric} from "./Fabric";
import {TestConfig} from "../config/TestConfig";
import {Utils} from "../utils/Utils";

export class MainTestClass {

    public executeTestScript() {
        const model: TestModel = TestModel.getInstance();
        const tasks: TaskModel[] = model.tasks;
        const config: TestConfig = model.config;
        /*const interval = setInterval(() => {
            const dispatcher = window["s_WrapperManager"]["dispatcher"];
            dispatcher['addListener']('Event.REELS_SPIN_STOPPED', () => {
                TestModel.isTestCanBeExecute = true;
            }, this);
            dispatcher['addListener']('Event.REELS_SPIN_STARTED', () => {
                TestModel.isTestCanBeExecute = false;
            }, this);
            clearInterval(interval);
        }, 1000);*/
        const fabric: Fabric = Fabric.getInstance();
        let previousAction = fabric.getInstance(tasks[0].type as TestTypeEnum,  tasks[0], config);
        const firstAction = previousAction;
        for (let i = 1; i < tasks.length; i++) {
            const testInstance: TestAction = fabric.getInstance(tasks[i].type as TestTypeEnum, tasks[i], config);
            previousAction.next = testInstance;
            previousAction = testInstance;
        }
        firstAction.execute();
    }

    // private startLoggingOnServer() {
    //     const serverModel: ServerModel = ServerModel.getInstance();
    //     const xml: XMLHttpRequest = new XMLHttpRequest();
    //     const wrapper = Utils.getWrapper();
    //     const mobileDetect = new MobileDetect(window.navigator.userAgent);
    //     let browserName: string;
    //     for (const name of Object.keys(wrapper.device.browser)) {
    //         if (wrapper.device.browser[name]) {
    //             browserName = name.slice(2);
    //         }
    //     }
    //     const data = {
    //         device: mobileDetect.mobile() ? mobileDetect.mobile() : "desktop",
    //         browser: browserName ? browserName : "Chrome"
    //     };
    //     xml.open('POST', `http://${serverModel.ip}:${serverModel.port}/api/logs`, true);
    //     xml.send(JSON.stringify(data));
    // }
}
