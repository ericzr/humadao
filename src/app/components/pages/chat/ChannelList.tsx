import { Hash, Search } from "lucide-react";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { useTranslation } from "react-i18next";

interface Channel {
  key: string;
  unread: number;
}

interface DM {
  name: string;
  status: string;
}

interface ChannelListProps {
  channels: Channel[];
  activeChannelKey: string;
  onChannelSelect: (key: string) => void;
  dms: DM[];
}

export function ChannelList({ channels, activeChannelKey, onChannelSelect, dms }: ChannelListProps) {
  const { t } = useTranslation();

  return (
    <div className="w-56 border-r border-border p-4 space-y-4 shrink-0 hidden md:block">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
        <Input placeholder={t("chat.searchPlaceholder")} className="pl-7 bg-secondary border-border h-8 text-xs" />
      </div>

      <div>
        <p className="text-muted-foreground mb-2 text-xs">{t("chat.channels")}</p>
        {channels.map((ch) => (
          <button
            key={ch.key}
            onClick={() => onChannelSelect(ch.key)}
            className={`flex items-center justify-between w-full px-3 py-1.5 rounded-lg transition text-sm ${
              activeChannelKey === ch.key ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            <span className="flex items-center gap-2"><Hash className="w-3 h-3" /> {t(ch.key)}</span>
            {ch.unread > 0 && (
              <span className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center text-background text-[0.65rem]">{ch.unread}</span>
            )}
          </button>
        ))}
      </div>

      <div>
        <p className="text-muted-foreground mb-2 text-xs">{t("chat.dms")}</p>
        {dms.map((dm) => (
          <button key={dm.name} className="flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition text-sm">
            <div className="relative">
              <Avatar className="w-5 h-5">
                <AvatarFallback className="bg-accent text-foreground text-[0.5rem]">{dm.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ${dm.status === "online" ? "bg-foreground/50" : "bg-foreground/20"}`} />
            </div>
            {dm.name}
          </button>
        ))}
      </div>
    </div>
  );
}
