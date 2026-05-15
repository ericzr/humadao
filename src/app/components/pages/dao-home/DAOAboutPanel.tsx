import { GitFork, Users } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { useTranslation } from "react-i18next";
import { ValuesTags } from "../../shared/ValuesTags";
import { SpectrumTags } from "../../shared/SpectrumTags";
import { getDAOLineage } from "@/data/dao";
import type { DAO, DAOLifecycle } from "@/types";

const lifecycleLabel: Record<DAOLifecycle, string> = {
  incubating: "lineage.lifecycle.incubating",
  active: "lineage.lifecycle.active",
  dormant: "lineage.lifecycle.dormant",
  archived: "lineage.lifecycle.archived",
};

const relationLabel: Record<string, string> = {
  project: "lineage.relation.project",
  regional: "lineage.relation.regional",
  functional: "lineage.relation.functional",
  ideological: "lineage.relation.ideological",
  experimental: "lineage.relation.experimental",
};

interface DAOAboutPanelProps {
  dao: DAO;
}

export function DAOAboutPanel({ dao }: DAOAboutPanelProps) {
  const { t } = useTranslation();
  const lineage = getDAOLineage(dao.id);
  const profile = dao.profile;
  const parentName = lineage?.parent ? t(lineage.parent.nameKey) : undefined;
  const childCount = lineage?.children.length ?? 0;

  return (
    <aside className="grid w-full gap-5 border-t border-border p-5 sm:grid-cols-3 sm:p-6 xl:block xl:w-72 xl:shrink-0 xl:space-y-5 xl:overflow-y-auto xl:border-l xl:border-t-0 xl:max-h-[calc(100vh-4rem)] scrollbar-none">
      {profile && (
        <section>
          <h3 className="mb-3">{t("dao.sidePanel.profile")}</h3>
          <div className="flex flex-wrap gap-1.5">
            <ValuesTags values={profile.values} threshold={70} max={3} />
            <SpectrumTags spectrum={profile.spectrum} max={2} />
          </div>
        </section>
      )}

      <section>
        <h3 className="mb-3">{t("dao.sidePanel.structure")}</h3>
        <div className="space-y-2 text-sm">
          {dao.lifecycle && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">{t("dao.sidePanel.stage")}</span>
              <Badge variant="secondary" className="rounded-md">
                {t(lifecycleLabel[dao.lifecycle])}
              </Badge>
            </div>
          )}
          {dao.relation && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">{t("dao.sidePanel.relation")}</span>
              <span className="text-right">{t(relationLabel[dao.relation] ?? dao.relation)}</span>
            </div>
          )}
          {parentName && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">{t("lineage.parent")}</span>
              <span className="truncate text-right">{parentName}</span>
            </div>
          )}
          {(parentName || childCount > 0) && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">{t("lineage.children")}</span>
              <span>{childCount}</span>
            </div>
          )}
        </div>
      </section>

      <section>
        <h3 className="mb-3">{t("dao.contributorsLabel")}</h3>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex -space-x-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full bg-accent border-2 border-card flex items-center justify-center text-muted-foreground text-[0.7rem]"
              >
                {String.fromCharCode(65 + index)}
              </div>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {dao.members.toLocaleString()} {t("lineage.members")}
          </span>
        </div>
        <Button variant="outline" className="w-full border-border text-foreground text-sm">
          <Users className="w-3 h-3 mr-1" /> {t("dao.inviteContributors")}
        </Button>
      </section>

      {(parentName || childCount > 0) && (
        <section className="rounded-md border border-border bg-card p-3">
          <div className="flex items-start gap-2">
            <GitFork className="mt-0.5 w-4 h-4 shrink-0 text-muted-foreground" />
            <p className="text-xs leading-5 text-muted-foreground">
              {t("dao.sidePanel.lineageHint")}
            </p>
          </div>
        </section>
      )}
    </aside>
  );
}
