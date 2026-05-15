import { useState } from "react";
import { useNavigate } from "react-router";
import { Bell, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { notifications } from "@/data";

export function TopNotifications() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [readSet, setReadSet] = useState<Set<number>>(new Set());
  const unreadCount = notifications.length - readSet.size;

  const markAllRead = () => {
    setReadSet(new Set(notifications.map((_, index) => index)));
  };

  const openNotification = (index: number, linkTo?: string) => {
    setReadSet((prev) => new Set(prev).add(index));
    if (linkTo) navigate(linkTo);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={t("workspace.notifications")}
          title={t("workspace.notifications")}
          data-testid="top-notifications-trigger"
          className="relative w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition shrink-0"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[320px] p-0">
        <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
          <div>
            <p className="text-sm font-medium">{t("workspace.notifications")}</p>
            <p className="text-xs text-muted-foreground">
              {unreadCount > 0
                ? t("workspace.notificationUnread", { count: unreadCount })
                : t("workspace.notificationClear")}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={markAllRead}>
              <Check className="w-3 h-3" />
              {t("workspace.markAllRead")}
            </Button>
          )}
        </div>

        <div className="max-h-[320px] overflow-y-auto p-1">
          {notifications.map((item, index) => {
            const isRead = readSet.has(index);
            return (
              <button
                key={item.textKey}
                type="button"
                onClick={() => openNotification(index, item.linkTo)}
                className={`flex w-full gap-2 rounded-md px-2 py-2 text-left transition hover:bg-accent ${
                  isRead ? "opacity-60" : ""
                }`}
              >
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                    isRead ? "bg-muted-foreground/20" : "bg-primary"
                  }`}
                />
                <span className="min-w-0">
                  <span className="block text-sm leading-5">{t(item.textKey)}</span>
                  <span className="block text-xs text-muted-foreground">{t(item.timeKey)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
