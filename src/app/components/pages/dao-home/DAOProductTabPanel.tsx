import type { ReactNode } from "react";
import { BookOpen, Building2, Scale, Vote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
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
  governanceHref: string;
}

const tabIcon = {
  tasks: BookOpen,
  governance: Scale,
  knowledge: BookOpen,
  organization: Building2,
} satisfies Record<ProductTab, typeof BookOpen>;

const primaryAction = {
  tasks: { labelKey: "dao.productPage.tasks.primary", icon: BookOpen },
  governance: { labelKey: "dao.productPage.governance.primary", icon: Vote },
  knowledge: { labelKey: "dao.productPage.knowledge.primary", icon: BookOpen },
  organization: { labelKey: "dao.productPage.organization.primary", icon: Building2 },
} satisfies Record<ProductTab, { labelKey: string; icon: typeof BookOpen }>;

export function DAOProductTabPanel({ dao, tab, modules, renderModule, governanceHref }: DAOProductTabPanelProps) {
  const { t } = useTranslation();
  const Icon = tabIcon[tab];
  const action = primaryAction[tab];
  const ActionIcon = action.icon;

  return (
    <div className="space-y-5">
      {tab !== "tasks" && (
        <Card className="border-border bg-card p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <h2>{t(`dao.productPage.${tab}.title`)}</h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                {t(`dao.productPage.${tab}.desc`)}
              </p>
            </div>

            {tab === "governance" ? (
              <Button asChild className="w-full sm:w-auto lg:shrink-0">
                <Link to={governanceHref}>
                  <ActionIcon className="h-4 w-4" />
                  {t(action.labelKey as never)}
                </Link>
              </Button>
            ) : (
              <Button className="w-full sm:w-auto lg:shrink-0" onClick={() => document.getElementById("dao-module-discussion")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                <ActionIcon className="h-4 w-4" />
                {t(action.labelKey as never)}
              </Button>
            )}
          </div>
        </Card>
      )}

      <div className={tab === "tasks" ? "space-y-0" : "space-y-5"}>
        {modules.map((module) => (
          <section key={module} id={`dao-module-${module}`} className="min-w-0 scroll-mt-4">
            {renderModule(module)}
          </section>
        ))}
      </div>

      {modules.length === 0 && (
        <Card className="border-dashed bg-card/50 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            {t("dao.productPage.empty")}
          </p>
        </Card>
      )}
    </div>
  );
}
