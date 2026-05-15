import { ClipboardList, MessageCircle, Vote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { ValuesTags } from "../../shared/ValuesTags";
import { SpectrumTags } from "../../shared/SpectrumTags";
import { MinimumProtocolCard } from "./MinimumProtocolCard";
import type { DAO, LocalizedText } from "@/types";

function localizeText(copy: LocalizedText | undefined, language: string) {
  if (!copy) return "";
  return language.startsWith("en") ? copy.en : copy.zh;
}

interface DAOOverviewProps {
  dao: DAO;
  showProtocolCard: boolean;
  onSelectTab?: (tab: "tasks" | "governance" | "knowledge") => void;
}

export function DAOOverview({ dao, showProtocolCard, onSelectTab }: DAOOverviewProps) {
  const { t, i18n } = useTranslation();
  const profile = dao.profile;

  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr]">
        <Card className="bg-card border-border p-4 sm:p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            {t("dao.overview.nextStep")}
          </p>
          <h2 className="text-lg mb-2">{t("dao.overview.title")}</h2>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="gap-1.5" onClick={() => onSelectTab?.("tasks")}>
              <ClipboardList className="w-4 h-4" />
              {t("dao.overview.findTask")}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 border-border"
              onClick={() => onSelectTab?.("governance")}
            >
              <Vote className="w-4 h-4" />
              {t("dao.overview.vote")}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="gap-1.5 text-muted-foreground"
              onClick={() => onSelectTab?.("knowledge")}
            >
              <MessageCircle className="w-4 h-4" />
              {t("dao.overview.discuss")}
            </Button>
          </div>
        </Card>

        <Card className="bg-card border-border p-4 sm:p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            {t("dao.overview.fit")}
          </p>
          <p className="text-sm text-muted-foreground leading-6">
            {dao.showcase
              ? localizeText(dao.showcase.participation, i18n.language)
              : t("dao.aboutDesc")}
          </p>
          {profile && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              <ValuesTags values={profile.values} threshold={70} max={2} />
              <SpectrumTags spectrum={profile.spectrum} max={2} />
            </div>
          )}
        </Card>
      </div>

      {showProtocolCard && <MinimumProtocolCard dao={dao} compact />}
    </div>
  );
}
