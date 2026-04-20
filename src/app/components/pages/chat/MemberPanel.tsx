import { Avatar, AvatarFallback } from "../../ui/avatar";
import { useTranslation } from "react-i18next";

interface DM {
  name: string;
  status: string;
}

interface MemberPanelProps {
  dms: DM[];
}

export function MemberPanel({ dms }: MemberPanelProps) {
  const { t } = useTranslation();
  const online = dms.filter((d) => d.status === "online");
  const offline = dms.filter((d) => d.status === "offline");

  return (
    <div className="w-52 border-l border-border p-4 shrink-0 hidden lg:block">
      <p className="text-muted-foreground mb-3 text-xs">{t("chat.members")} · 68</p>
      <div className="space-y-2">
        <p className="text-muted-foreground text-[0.7rem]">{t("chat.online")} — {online.length}</p>
        {online.map((m) => (
          <div key={m.name} className="flex items-center gap-2 py-1">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="bg-accent text-foreground text-[0.5rem]">{m.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs">{m.name}</span>
          </div>
        ))}
        <p className="text-muted-foreground mt-3 text-[0.7rem]">{t("chat.offline")} — 64</p>
        {offline.map((m) => (
          <div key={m.name} className="flex items-center gap-2 py-1 opacity-50">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="bg-secondary text-muted-foreground text-[0.5rem]">{m.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs">{m.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
