import {TestAction} from "../actions/TestAction";
import {ServerModel} from "../model/ServerModel";
import {Utils} from "../utils/Utils";
import * as html2canvas from 'html2canvas';
import {TaskModel} from "../model/TaskModel";

export class ScreenShotAction extends TestAction {

    protected CANVAS_GLOBAL_ALPHA: number;
    private readonly taskModel: TaskModel;
    private static _renderer;

    constructor(model: TaskModel) {
        super();
        this.taskModel = model;
        this.CANVAS_GLOBAL_ALPHA = model.target === 'html' ? 0.15 : 0.75;
    }

    protected start(): void {
        console.log(`==> TASK: ${this.taskModel.order} STARTS, Action ==> ScreenShotAction`);
        const renderer = this.getRenderer();

        const renderTexture: any = PIXI.RenderTexture.create(renderer.width, renderer.height);
        renderer.render(this.getCurrentViewComponent(), renderTexture);
        const gameCanvas = renderer.extract.canvas(renderTexture);

        const elements = document.getElementsByTagName('canvas');
        const element = elements[2] as HTMLCanvasElement;
        if (element) {
            element.parentElement.removeChild(element);
        }

        html2canvas(document.body, {removeContainer: true}).then(canvas => {
            const ctx = canvas.getContext('2d');
            ctx.globalAlpha = this.CANVAS_GLOBAL_ALPHA;
            ctx.drawImage(gameCanvas, 0, 0);
            this.saveImageToServer(canvas);
        });
    }

    private getRenderer() {
        if (!ScreenShotAction._renderer) {
            ScreenShotAction._renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
            document.body.appendChild(ScreenShotAction._renderer.view);
        }
        return ScreenShotAction._renderer;
    }

    private getCurrentViewComponent(): any {
        return window['c_gameSceneMobile'] || window['c_gameSceneDesktop'] || window['c_rootGroup'] || window['c_startScene'] || window['c_sceneGroup'];
    }

    private saveImageToServer(canvas: HTMLCanvasElement) {
        const serverModel: ServerModel = ServerModel.getInstance();
        const data: any = canvas.toDataURL('image/png');
        const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        const imageAsBlob: Blob = this.b64toBlob(matches[2], 'png');
        const lang: string = Utils.getWrapper().device.getParams['lang'] ? Utils.getWrapper().device.getParams['lang'] : "en";

        fetch(`http://${serverModel.ip}:${serverModel.port}/api/saveScreenShot/${lang}`, { // Your POST endpoint
            method: 'POST',
            headers: {
                "Content-Type": "You will perhaps need to define a content-type here"
            },
            body: imageAsBlob // This is your file object
        }).then(
            response => {
                console.log(`==> `, response);
            } // if the response is a JSON object
        ).then(
            success => {
                console.log(`==> TASK: ${this.taskModel.order} ENDS`);
                this.runNext();
            } // Handle the success response object
        ).catch(
            error => console.log(`==> ${error}`) // Handle the error response object
        );

    }

    protected b64toBlob(b64Data, contentType = '', sliceSize = 512): Blob {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {type: contentType});
    }
}
