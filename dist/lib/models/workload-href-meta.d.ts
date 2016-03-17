export default class WorkloadHrefMeta {
    modulePath: string;
    className: string;
    constructor(modulePath: string, className: string);
    static parse(href: string): WorkloadHrefMeta;
    private static parseWorking(meta);
    private static parseSimplePath(href);
}
