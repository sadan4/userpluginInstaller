import { Button, ChannelStore } from "@webpack/common";
import { Message } from "discord-types/general";
import { CLONE_LINK_REGEX, clonePlugin } from ".";

const WHITELISTED_SHARE_CHANNELS = ["1256395889354997771", "1032200195582197831", "1301947896601509900"];

export default function UserpluginInstallButton({ props }: any) {
    const message: Message = props.message;
    if (!WHITELISTED_SHARE_CHANNELS.includes(ChannelStore.getChannel(message.channel_id).parent_id) && !WHITELISTED_SHARE_CHANNELS.includes(message.channel_id))
        return;
    const gitLink = (props.message.content as string).match(CLONE_LINK_REGEX);
    if (!gitLink) return;
    return <Button style={{
        marginTop: "5px"
    }}
        onClick={() => clonePlugin(gitLink)}>
        Install plugin
    </Button>;
}
