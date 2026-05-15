import type { ReactNode } from "react";
import {
  BookOpen,
  Building2,
  ClipboardList,
  Scale,
  Users,
  Vote,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import type { DAO, DAOModule } from "@/types";

type TabModule = Exclude<DAOModule, "protocolCard">;
type ProductTab = "tasks" | "governance" | "knowledge" | "organization";

interface DAOProductTabPanelProps {
  dao: DAO;
  tab: ProductTab;
  modules: TabModule[];
  renderModule: (module: TabModule) => ReactNode;
}

const tabIcon = {
  tasks: ClipboardList,
  governance: Scale,
  knowledge: BookOpen,
  organization: Building2,
} satisfies Record<ProductTab, typeof ClipboardList>;

const primaryAction = {
  tasks: { targetModule: "bounties", labelKey: "dao.productPage.tasks.primary", icon: ClipboardList },
  governance: { targetModule: "proposals", labelKey: "dao.productPage.governance.primary", icon: Vote },
  knowledge: { targetModule: "discussion", labelKey: "dao.productPage.knowledge.primary", icon: BookOpen },
  organization: { targetModule: "lineage", labelKey: "dao.productPage.organization.primary", icon: Building2 },
} satisfies Record<ProductTab, { targetModule: TabModule; labelKey: string; icon: typeof ClipboardList }>;

function metricsFor(tab: ProductTab, dao: DAO) {
  if (tab === "tasks") {
    return [
      ["dao.productPage.metric.openTasks", "12"],
      ["dao.productPage.metric.activeContributors", "28"],
    ];
  }
  if (tab === "governance") {
    return [
      ["dao.productPage.metric.activeProposals", "3"],
      ["dao.productPage.metric.voterTurnout", "67%"],
    ];
  }
  if (tab === "knowledge") {
    return [
      ["dao.productPage.metric.documents", "4"],
      ["dao.productPage.metric.updates", "3"],
    ];
  }
  return [
    ["dao.productPage.metric.members", dao.members.toLocaleString()],
    ["dao.productPage.metric.subOrgs", String(dao.childIds?.length ?? 0)],
  ];
}

export function DAOProductTabPanel({ dao, tab, modules, renderModule }: DAOProductTabPanelProps) {
  const { t } = useTranslation();
  const Icon = tabIcon[tab];
  const action = primaryAction[tab];
  const ActionIcon = action.icon;
  const metrics = metricsFor(tab, dao);
  const handlePrimaryAction = () => {
    document.getElementById(`dao-module-${action.targetModule}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="space-y-5">
      <Card className="border-border bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center">
                <Icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <h2>{t(`dao.productPage.${tab}.title`)}</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-6 max-w-2xl">
              {t(`dao.productPage.${tab}.desc`)}
            </p>
          </div>

          <Button
            className="w-full sm:w-auto sm:self-start lg:self-auto lg:shrink-0"
            onClick={handlePrimaryAction}
          >
            <ActionIcon className="w-4 h-4" />
            {t(action.labelKey as never)}
          </Button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {metrics.map(([labelKey, value]) => (
            <div key={labelKey} className="rounded-md border border-border bg-background px-3 py-2.5">
              <p className="text-lg font-semibold">{value}</p>
              <p className="text-xs text-muted-foreground">{t(labelKey as never)}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-5">
        {modules.map((module) => (
          <section key={module} id={`dao-module-${module}`} className="min-w-0 scroll-mt-4">
            {renderModule(module)}
          </section>
        ))}
      </div>

      {modules.length === 0 && (
        <Card className="border-dashed bg-card/50 p-8 text-center">
          <Users className="w-8 h-8 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-sm text-muted-foreground">
            {t("dao.productPage.empty")}
          </p>
        </Card>
      )}
    </div>
  );
}
