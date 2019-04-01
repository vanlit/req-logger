import * as fse from 'fs-extra';
import * as fs from 'fs';

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
        const filename = `${this._logDir}/${category}.log`;
        return fse.open(filename, 'a')
        .then( (fDesc: number)=> {
            return fse.appendFile(
                fDesc,
                `${new Date().toISOString()}: ${JSON.stringify(data)}\r\n`
            )
            .then( () => {
                return fse.close(fDesc);
            });
        });
    };

    public GetLog(category: string, buffer: Buffer, byteSizeLimit: number = 1024*100): Promise<string> {
        const filename = `${this._logDir}/${category}.log`;

        return new Promise<string>((resolveLogGetting, rejectLogGetting) => {
            const fileLen = fs.stat(filename, (err, filestats) => {
                if(err) {rejectLogGetting(err);}
                else {
                    const offset = (filestats.size - byteSizeLimit > 0) ? filestats.size - byteSizeLimit : 0;
                    fse.open(filename, 'ro')
                    .then( (fDesc: number)=> {
                        fse.read(
                            fDesc, buffer, offset, byteSizeLimit, 0
                        )
                        .then( () => {
                            fse.close(fDesc);
                            resolveLogGetting();
                        })
                        .catch((err) => {
                            fse.close(fDesc);
                            rejectLogGetting(err);
                        });
                    });
                }
            });
        })

    }

}