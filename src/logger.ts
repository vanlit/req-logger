import * as fse from 'fs-extra';

export interface ICategorizedDataLogger {
    Log: (category: string, data: any) => Promise<void>
}

export default class CategorizedDataLogger implements ICategorizedDataLogger{
    private _logDir: any;

    public constructor(logDir: string) {
        this._logDir = logDir;
        fse.mkdirsSync(this._logDir);
    }

    public Log(category: string, data: any): Promise<void> {
        return fse.open(`${this._logDir}/${category}.log`, 'wa')
        .then( (fDesc)=> {
            return fse.appendFile(
                fDesc,
                `${new Date().toISOString()}: ${JSON.stringify(data)}\n`
            )
            .then( () => {
                return fse.close(fDesc);
            })
        });
    }

}