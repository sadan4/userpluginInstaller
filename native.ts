import { exec, spawn } from "child_process";
import { IpcMainInvokeEvent } from "electron";

export async function cloneRepo(_: IpcMainInvokeEvent, repo: string, clonePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
        exec(`git clone ${repo} ${clonePath}`, (error, stdout, stderr) => {
            if (error) {
                return reject(
                    stderr
                );
            }
            resolve(null);
        });
    });
}
