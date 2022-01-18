export default class Setting {
    static isMobile() {
        const browser = navigator.userAgent;
        return /mobi/i.test(browser);
    }
}