import type { ChatChannel, DirectMessage, ChatMessage } from "@/types";

export const channels: ChatChannel[] = [
  { key: "chat.channel.general", unread: 3 },
  { key: "chat.channel.engineering", unread: 0 },
  { key: "chat.channel.bounty", unread: 7 },
  { key: "chat.channel.governance", unread: 1 },
  { key: "chat.channel.announcement", unread: 0 },
];

export const directMessages: DirectMessage[] = [
  { name: "Sero", status: "online" },
  { name: "ifun", status: "online" },
  { name: "扎夫", status: "offline" },
  { name: "hamzat_iii", status: "online" },
];

export const chatMessages: ChatMessage[] = [
  { user: "Sero", textKey: "chat.msg.1", time: "10:32", avatar: "S" },
  { user: "ifun", textKey: "chat.msg.2", time: "10:35", avatar: "I", ref: { type: "bounty", titleKey: "chat.ref.frontendUI", amount: "¥3,000" } },
  { user: "Sero", textKey: "chat.msg.3", time: "10:37", avatar: "S" },
  { user: "Alex.eth", textKey: "chat.msg.4", time: "10:45", avatar: "A", ref: { type: "proposal", titleKey: "chat.ref.treasury" } },
  { user: "hamzat_iii", textKey: "chat.msg.5", time: "10:52", avatar: "H" },
  { user: "ifun", textKey: "chat.msg.6", time: "10:55", avatar: "I" },
  { user: "Sero", textKey: "chat.msg.7", time: "11:00", avatar: "S" },
];
