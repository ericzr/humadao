import { useState } from "react";
import { ChannelList } from "./chat/ChannelList";
import { MessageArea } from "./chat/MessageArea";
import { MemberPanel } from "./chat/MemberPanel";
import { channels, directMessages, chatMessages } from "@/data";

export function ChatPage() {
  const [activeChannelKey, setActiveChannelKey] = useState(channels[0].key);

  return (
    <div className="flex h-full">
      <ChannelList
        channels={channels}
        activeChannelKey={activeChannelKey}
        onChannelSelect={setActiveChannelKey}
        dms={directMessages}
      />
      <MessageArea activeChannelKey={activeChannelKey} messages={chatMessages} />
      <MemberPanel dms={directMessages} />
    </div>
  );
}
