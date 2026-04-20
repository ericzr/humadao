import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { getDAOLineage } from "@/data/dao";
import { GitFork, ArrowRight, Circle, Sprout, Pause, Archive } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import type { DAO, DAOLifecycle } from "@/types";

const lifecycleConfig: Record<DAOLifecycle, { icon: typeof Circle; color: string; label: string }> = {
  incubating: { icon: Sprout, color: "text-amber-500 bg-amber-500/10", label: "lineage.lifecycle.incubating" },
  active: { icon: Circle, color: "text-green-500 bg-green-500/10", label: "lineage.lifecycle.active" },
  dormant: { icon: Pause, color: "text-gray-400 bg-gray-400/10", label: "lineage.lifecycle.dormant" },
  archived: { icon: Archive, color: "text-red-400 bg-red-400/10", label: "lineage.lifecycle.archived" },
};

const relationLabels: Record<string, string> = {
  project: "lineage.relation.project",
  regional: "lineage.relation.regional",
  functional: "lineage.relation.functional",
  ideological: "lineage.relation.ideological",
  experimental: "lineage.relation.experimental",
};

function LifecycleBadge({ lifecycle }: { lifecycle?: DAOLifecycle }) {
  const { t } = useTranslation();
  const lc = lifecycle ?? "active";
  const cfg = lifecycleConfig[lc];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cfg.color}`}>
      <Icon className="h-3 w-3" />
      {t(cfg.label)}
    </span>
  );
}

function DAONode({ dao, isCurrent }: { dao: DAO; isCurrent?: boolean }) {
  const { t } = useTranslation();
  return (
    <div className={`rounded-lg border p-4 transition-all ${isCurrent ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border bg-card hover:border-primary/30"}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className={`font-semibold truncate ${isCurrent ? "text-primary" : ""}`}>
            {t(dao.nameKey)}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {dao.members.toLocaleString()} {t("lineage.members")}
            {dao.foundedDate && <> · {dao.foundedDate}</>}
          </p>
        </div>
        <LifecycleBadge lifecycle={dao.lifecycle} />
      </div>
      {dao.relation && (
        <Badge variant="outline" className="mt-2 text-xs">
          {t(relationLabels[dao.relation] ?? dao.relation)}
        </Badge>
      )}
    </div>
  );
}

function ForkDetail({ dao }: { dao: DAO }) {
  const { t } = useTranslation();
  if (!dao.forkHistory?.length) return null;
  const fork = dao.forkHistory[0];
  const inheritItems = Object.entries(fork.inherited)
    .filter(([, v]) => v)
    .map(([k]) => t(`lineage.inherit.${k}`));

  return (
    <div className="mt-2 rounded-md bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
      <p className="font-medium text-foreground mb-1">{t("lineage.forkReason")}: {fork.reason}</p>
      <p>{t("lineage.inherited")}: {inheritItems.join("、")}</p>
    </div>
  );
}

interface DAOLineageProps {
  onFork?: () => void;
}

export function DAOLineage({ onFork }: DAOLineageProps) {
  const { t } = useTranslation();
  const { id } = useParams();
  const lineage = getDAOLineage(id!);

  if (!lineage) {
    return <p className="text-muted-foreground text-sm">{t("lineage.noData")}</p>;
  }

  const { parent, current, children } = lineage;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <GitFork className="h-5 w-5 text-primary" />
            {t("lineage.title")}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{t("lineage.subtitle")}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {parent && (
              <>
                <div>
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{t("lineage.origin")}</p>
                  <DAONode dao={parent} />
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
                </div>
              </>
            )}

            <div>
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{t("lineage.current")}</p>
              <DAONode dao={current} isCurrent />
              <ForkDetail dao={current} />
            </div>

            {children.length > 0 && (
              <>
                <div className="flex justify-center">
                  <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                    {t("lineage.children")} ({children.length})
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {children.map((child) => (
                      <div key={child.id}>
                        <DAONode dao={child} />
                        <ForkDetail dao={child} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fork CTA — 分叉是「谱系延伸」的上下文动作，放在谱系可视化下方最自然 */}
      {onFork && (
        <Card className="border-dashed bg-card/50">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <GitFork className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{t("fork.ctaTitle")}</p>
                <p className="text-muted-foreground text-xs mt-1 leading-5">
                  {t("fork.ctaDesc")}
                </p>
              </div>
              <Button
                onClick={onFork}
                variant="outline"
                size="sm"
                className="shrink-0 gap-1.5 self-start sm:self-center"
              >
                <GitFork className="w-4 h-4" />
                {t("fork.button")}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
