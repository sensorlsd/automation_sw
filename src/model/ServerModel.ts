export class ServerModel {
    private _ip: string;
    private _port: string;

    private static instance: ServerModel;

    static getInstance() {
        if (!ServerModel.instance) {
            ServerModel.instance = new ServerModel();
        }
        return ServerModel.instance;
    }

    get ip(): string {
        return this._ip;
    }

    set ip(value: string) {
        this._ip = value;
    }

    get port(): string {
        return this._port;
    }

    set port(value: string) {
        this._port = value;
    }
}
