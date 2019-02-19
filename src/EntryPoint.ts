import {InitTestApp} from "./init/InitTestApp";
import {MainTestClass} from "./main/MainTestClass";
import {Utils} from "./utils/Utils";
import {ServerModel} from "./model/ServerModel";

export class EntryPoint {
    private _init: InitTestApp = new InitTestApp();
    private _main: MainTestClass = new MainTestClass();
    private _startInterval: any;

    public run() {
        this._startInterval = setInterval(() => {
            if (Utils.getWrapper()) {
                this.initApp();
                clearInterval(this._startInterval);
            }
        }, 1000);
    }

    private initApp() {
        const testIdString: string = Utils.getWrapper().device.getParams['testId'];
        const testId: number = +testIdString;
        if (testId) {
            const serverAddress: string = Utils.getWrapper().device.getParams['testUrl'];
            if (serverAddress) {
                const addressArray: string[] = serverAddress.split(':');
                if (addressArray.length < 2) {
                    console.log('<= port is absent =>');
                    return;
                }
                this._init.initServer(addressArray[0], addressArray[1]);
                this.loadTestCase(testId);
            } else {
                console.log('<= test server address absence =>');
                return;
            }
        }
    }

    private loadTestCase(testId: number) {
        const serverModel: ServerModel = ServerModel.getInstance();
        fetch(`http://${serverModel.ip}:${serverModel.port}/getTestCase/${testId}`, {
            method: 'GET'
        }).then((data: any) => {
            data.json().then( data => {
                this._init.initModel(data);
                this._main.executeTestScript();
            });
        }, e => {
            console.log(`==>> TestCase: #${testId} not found`);
        }).catch(e => {
            console.log(`==>> TestCase: #${testId} not found`);
        });
    }
}
