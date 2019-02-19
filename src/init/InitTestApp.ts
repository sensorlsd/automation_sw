import {ServerModel} from "../model/ServerModel";
import {TaskModel} from "../model/TaskModel";
import {TestModel} from "../model/TestModel";
import {TestConfig} from "../config/TestConfig";

export class InitTestApp {

    public initModel(data: any) {
        const model: TestModel = TestModel.getInstance();

        for (const task of data['tasks']) {
            const t: TaskModel = new TaskModel();
            t.order = task['order'] || 0;
            t.target = task['target'] || "";
            t.type = task['type'] || "";
            t.value = task['value'] || 0;
            t.dataArray = task['dataArray'] || [];
            model.tasks.push(t);
        }
        if (data['config']) {
            const config: TestConfig = new TestConfig();
            config.languageList = data['config']['languageList'] ? data['config']['languageList'] : [];
            config.currencyList = data['config']['currencyList'] ? data['config']['currencyList'] : [];
            model.config = config;
        }
    }

    public initServer(ip: string, port: string) {
        const serverModel: ServerModel = ServerModel.getInstance();
        serverModel.ip = ip;
        serverModel.port = port;
    }
}
