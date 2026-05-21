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
    <aside className="w-full border-t border-border p-5 sm:p-6 xl:w-72 xl:shrink-0 xl:border-l xl:border-t-0 xl:max-h-[calc(100vh-4rem)] xl:overflow-y-auto scrollbar-none">
      <div className="space-y-5">
        {profile && (
          <section className="rounded-md border border-border bg-card p-4">
            <h3 className="mb-3">{t("dao.sidePanel.profile")}</h3>
            <div className="flex flex-wrap gap-1.5">
              <ValuesTags values={profile.values} threshold={70} max={3} />
              <SpectrumTags spectrum={profile.spectrum} max={2} />
            </div>
          </section>
        )}

        <section className="rounded-md border border-border bg-card p-4">
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

        <section className="rounded-md border border-border bg-card p-4">
          <h3 className="mb-3">{t("dao.contributorsLabel")}</h3>
          <div className="flex items-center justify-between gap-3">
            <div className="flex -space-x-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-accent text-[0.7rem] text-muted-foreground"
                >
                  {String.fromCharCode(65 + index)}
                </div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {dao.members.toLocaleString()} {t("lineage.members")}
            </span>
          </div>
          <Button variant="outline" className="mt-3 w-full border-border text-sm text-foreground">
            <Users className="h-3 w-3" /> {t("dao.inviteContributors")}
          </Button>
        </section>

        {(parentName || childCount > 0) && (
          <section className="rounded-md border border-border bg-card p-3">
            <div className="flex items-start gap-2">
              <GitFork className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="text-xs leading-5 text-muted-foreground">
                {t("dao.sidePanel.lineageHint")}
              </p>
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}
