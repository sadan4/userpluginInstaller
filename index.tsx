import { Notices } from "@api/index";
import { addAccessory } from "@api/MessageAccessories";
import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
import { Button, ChannelStore, Forms } from "@webpack/common";
import { Message } from "discord-types/general";

const WHITELISTED_SHARE_CHANNELS = ["1256395889354997771", "1032200195582197831"];
const CLONE_LINK_REGEX = /(https:\/\/(?:git(?:hub|lab)\.com|git\.(?:[a-zA-Z0-9]|\.)+|codeberg\.org)\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+(?:\.git)?(?:\/)?)/;

function UserpluginInstallButton({ props }: any) {
    const message: Message = props.message;
    if (!WHITELISTED_SHARE_CHANNELS.includes(ChannelStore.getChannel(message.channel_id).parent_id) && !WHITELISTED_SHARE_CHANNELS.includes(message.channel_id))
        return;
    const gitLink = (props.message.content as string).match(CLONE_LINK_REGEX);
    if (!gitLink) return;
    return <Button style={{
        marginTop: "5px"
    }}
        onClick={() => {
            console.log(ChannelStore.getChannel(message.channel_id));
        }}>
        Install plugin
    </Button>;
}

export default definePlugin({
    name: "UserpluginInstaller",
    description: "Install userplugins with a simple button click",
    authors: [Devs.nin0dev],
    start() {
        addAccessory("userpluginInstallButton", (props: Record<string, any>) => (
            <UserpluginInstallButton props={props} />
        ), 4);
    }
});
