import { useState } from "react";
import { History, List } from "lucide-react";
import { Button } from "../../ui/button";
import { ContributionRecordCard } from "../../shared/ContributionRecordCard";
import { useTranslation } from "react-i18next";
import { townHallDAOs } from "@/data";
import type { ContributionRecord, Contributor } from "@/types";
import { ContributionTimeline } from "./ContributionTimeline";

interface ContributionArchiveProps {
  contributor: Contributor;
  timeline: ContributionRecord[];
}

export function ContributionArchive({ contributor, timeline }: ContributionArchiveProps) {
  const { t } = useTranslation();
  const [view, setView] = useState<"list" | "timeline">("list");
  const daoMap = new Map(townHallDAOs.map((dao) => [dao.id, dao]));

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2>{t("profile.contributionArchive")}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{t("profile.contributionArchiveHint")}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg bg-secondary p-1">
            <Button
              type="button"
              size="sm"
              variant={view === "list" ? "default" : "ghost"}
              className="h-8 w-8 px-0"
              onClick={() => setView("list")}
              aria-label={t("profile.archiveView.list")}
              title={t("profile.archiveView.list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant={view === "timeline" ? "default" : "ghost"}
              className="h-8 w-8 px-0"
              onClick={() => setView("timeline")}
              aria-label={t("profile.archiveView.timeline")}
              title={t("profile.archiveView.timeline")}
            >
              <History className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {view === "timeline" ? (
        <ContributionTimeline contributor={contributor} timeline={timeline} />
      ) : (
        <div className="space-y-3">
          {timeline.map((record) => {
            const dao = daoMap.get(record.daoId);
            return <ContributionRecordCard key={record.id} record={record} dao={dao} />;
          })}
        </div>
      )}
    </section>
  );
}
