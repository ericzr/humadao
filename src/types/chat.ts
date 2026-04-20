export interface ChatChannel {
  key: string;
  unread: number;
}

export interface DirectMessage {
  name: string;
  status: "online" | "offline";
}

export interface ChatMessageRef {
  type: "bounty" | "proposal";
  titleKey: string;
  amount?: string;
}

export interface ChatMessage {
  user: string;
  textKey: string;
  time: string;
  avatar: string;
  ref?: ChatMessageRef;
}
