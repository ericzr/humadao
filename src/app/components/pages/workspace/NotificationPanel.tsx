import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Bell, Coins, Vote, MessageCircle, ArrowRight, Briefcase, Check } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { useTranslation } from "react-i18next";
import { notifications as notifData } from "@/data";

const quickLinks = [
  { labelKey: "workspace.link.bounties", to: "/bounties", icon: Coins },
  { labelKey: "workspace.link.governance", to: "/governance", icon: Vote },
  { labelKey: "workspace.link.chat", to: "/chat", icon: MessageCircle },
  { labelKey: "workspace.link.create", to: "/create-project", icon: Briefcase },
];

export function NotificationPanel() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [readSet, setReadSet] = useState<Set<number>>(new Set());

  const unreadCount = notifData.length - readSet.size;

  const handleClick = (index: number, linkTo?: string) => {
    setReadSet((prev) => new Set(prev).add(index));
    if (linkTo) navigate(linkTo);
  };

  const markAllRead = () => {
    setReadSet(new Set(notifData.map((_, i) => i)));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-muted-foreground" />
            {t("workspace.notifications")}
            {unreadCount > 0 && (
              <span className="bg-destructive text-destructive-foreground text-[0.65rem] rounded-full px-1.5 py-0.5 leading-none">{unreadCount}</span>
            )}
          </h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-7" onClick={markAllRead}>
              <Check className="w-3 h-3 mr-1" />{t("workspace.markAllRead")}
            </Button>
          )}
        </div>
        <div className="space-y-1">
          {notifData.map((n, i) => {
            const isRead = readSet.has(i);
            return (
              <div
                key={i}
                className={`flex gap-3 p-2 rounded-lg transition cursor-pointer hover:bg-accent/50 ${isRead ? "opacity-60" : ""}`}
                onClick={() => handleClick(i, n.linkTo)}
              >
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${isRead ? "bg-muted-foreground/20" : "bg-primary"}`} />
                <div className="min-w-0">
                  <p className="text-sm">{t(n.textKey)}</p>
                  <p className="text-muted-foreground text-xs">{t(n.timeKey)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="bg-card border-border p-4 sm:p-5">
        <h3 className="mb-3">{t("workspace.quickLinks")}</h3>
        <div className="space-y-2">
          {quickLinks.map((link) => (
            <Link key={link.to} to={link.to} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition text-muted-foreground hover:text-foreground">
              <link.icon className="w-4 h-4" />
              <span className="text-sm">{t(link.labelKey)}</span>
              <ArrowRight className="w-3 h-3 ml-auto" />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
