import { Notices } from "@api/index";
import { addAccessory } from "@api/MessageAccessories";
import { Devs } from "@utils/constants";
import definePlugin, { PluginNative } from "@utils/types";
import { Button, ChannelStore, Forms, Toasts } from "@webpack/common";
import { Message } from "discord-types/general";
import { clone } from "lodash";
import UserpluginInstallButton from "./UserpluginInstallButton";
import { showInstallModal } from "./UserpluginInstallModal";

import "./style.css";

export let plugins: any[] = [];
export const CLONE_LINK_REGEX = /https:\/\/(?:git(?:hub|lab)\.com|git\.(?:[a-zA-Z0-9]|\.)+|codeberg\.org)\/(?!user-attachments)(?:[a-zA-Z0-9]|-)+\/((?:[a-zA-Z0-9]|-)+)(?:\.git)?(?:\/)?/;

// @ts-ignore
export const Native = VencordNative.pluginHelpers.UserpluginInstaller as PluginNative<typeof import("./native")>;

export async function clonePlugin(gitLink: RegExpMatchArray) {
    Toasts.show({
        message: "Cloning plugin...",
        id: Toasts.genId(),
        type: Toasts.Type.MESSAGE
    });
    try {
        const path = `${VesktopNative.fileManager.getVencordDir().replace("\\", "/")}/../src/userplugins/${gitLink[1]}`;
        const clonedRepo = await Native.cloneRepo(gitLink[0], path);
        const meta = await Native.getPluginMeta(path);
        console.log(meta);
        showInstallModal(meta, path);
    }
    catch (e) {
        Toasts.pop();
        return Toasts.show({
            message: "Something bad has happened while cloning the plugin, try again later and make sure that the plugin link is valid.",
            id: Toasts.genId(),
            type: Toasts.Type.FAILURE
        });
    }
}

export default definePlugin({
    name: "UserpluginInstaller",
    description: "Install userplugins with a simple button click",
    authors: [Devs.nin0dev],
    async start() {
        plugins = await Native.getPlugins(`${VesktopNative.fileManager.getVencordDir().replace("\\", "/")}/../src/userplugins/`);
        console.log(plugins);
        addAccessory("userpluginInstallButton", (props: Record<string, any>) => (
            <UserpluginInstallButton props={props} />
        ), 4);
    }
});
