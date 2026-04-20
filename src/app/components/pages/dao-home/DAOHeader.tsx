import { useState } from "react";
import { useParams } from "react-router";
import {
  Star, CalendarDays, Users, UserPlus,
  CheckCircle2, Loader2, Shield,
} from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { useTranslation } from "react-i18next";
import { findDAOById } from "@/data/dao";
import { myDAOs } from "@/data";
import type { LocalizedText } from "@/types";

function localizeText(copy: LocalizedText | undefined, language: string) {
  if (!copy) return "";
  return language.startsWith("en") ? copy.en : copy.zh;
}

type MembershipState = "none" | "pending" | "member";

export function DAOHeader() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const dao = id ? findDAOById(id) : undefined;

  // 如果此 DAO 在用户的工作台（已加入列表）里，初始化为已加入状态
  const isJoined = myDAOs.some((d) => d.id === id);
  const [membership, setMembership] = useState<MembershipState>(
    isJoined ? "member" : "none"
  );

  function handleJoin() {
    setMembership("pending");
    setTimeout(() => setMembership("member"), 1500);
  }

  if (!dao) return null;

  const stageText = localizeText(dao.showcase?.stage, i18n.language);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
        {/* Left: avatar + info */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${dao.color ?? "bg-accent"} flex items-center justify-center text-white text-xl shrink-0`}
          >
            {(dao.avatar ?? t(dao.nameKey).charAt(0)).charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl">{t(dao.nameKey)}</h1>
              {membership === "member" && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  <Shield className="w-3 h-3" />
                  {t("dao.memberBadge")}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-sm mt-0.5 line-clamp-2">{t(dao.descKey)}</p>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {dao.members.toLocaleString()} {t("home.members")}
              </span>
              {dao.foundedDate && (
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" />
                  {dao.foundedDate}
                </span>
              )}
              {dao.mode && (
                <span>{t(`townHall.filter.modes.${dao.mode}` as never)}</span>
              )}
            </div>
          </div>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-2 self-start shrink-0">
          {membership === "none" && (
            <Button size="sm" onClick={handleJoin} className="gap-1.5">
              <UserPlus className="w-4 h-4" />
              {t("dao.joinOrg")}
            </Button>
          )}
          {membership === "pending" && (
            <Button size="sm" disabled className="gap-1.5">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t("dao.joinPending")}
            </Button>
          )}
          {membership === "member" && (
            <Button size="sm" variant="outline" className="gap-1.5 text-primary border-primary/30">
              <CheckCircle2 className="w-4 h-4" />
              {t("dao.joined")}
            </Button>
          )}
          <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-accent gap-1">
            <Star className="w-4 h-4" />
            <span className="hidden sm:inline">{t("dao.follow")}</span>
          </Button>
        </div>
      </div>

      {stageText && (
        <div className="bg-accent/40 border border-border rounded-lg px-4 py-2.5 mb-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">
            {t("dao.showcase.stage")}
          </p>
          <p className="text-sm text-muted-foreground">{stageText}</p>
        </div>
      )}
    </>
  );
}
