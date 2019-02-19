import {TestAction} from "../actions/TestAction";
import {TestConfig} from "../config/TestConfig";
import {Utils} from "../utils/Utils";

export class ReloadAction extends TestAction {
    protected _config: TestConfig;

    constructor(config: TestConfig) {
        super();
        this._config = config;
    }

    protected start(): void {
        console.log(`==> autotest | ReloadAction | execute`);
        const wrapper = Utils.getWrapper();
        const newLang: string = this.setNewLang(wrapper);
        const newCurrency: string = this.setNewCurrency(wrapper);
        if (newLang) {
            window.location.href = this.setNewUrlString("lang", newLang, window.location.href);
        } else if (newCurrency) {
            window.location.href = this.setNewUrlString("currency", newCurrency, window.location.href);
        } else {
            this.runNext();
        }
    }

    private setNewLang(wrapper: any): string {
        const currentLang: string = wrapper.device.getParams['lang'];
        return this.setNewString(currentLang, this._config.languageList);
    }

    private setNewCurrency(wrapper: any): string {
        const currentCurrency: string = wrapper.device.getParams['currency'];
        return this.setNewString(currentCurrency, this._config.currencyList);
    }

    private setNewString(str: string, list: Array<string>): string {
        let newString: string = null;
        if (str) {
            const index: number = list.indexOf(str);
            if (index === list.length - 1) {
                return null;
            }
            newString = list[index + 1];
        } else {
            newString = list[0];
        }

        return newString;
    }

    private setNewUrlString(type: string, str: string, currentHref: string): string {
        let newUrl: string = null;
        if (currentHref.indexOf(type) === -1) {
            newUrl = currentHref + `&${type}=${str}`;
        } else {
            const tempUrl: string = currentHref.slice(currentHref.indexOf( '?' ) + 1);
            const tempArray: Array<string> = tempUrl.split('&');
            newUrl = currentHref.replace(tempArray[tempArray.length - 1], `${type}=${str}`);
        }

        return newUrl;
    }
}
