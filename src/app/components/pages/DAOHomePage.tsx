import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Settings2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { DAOHeader } from "./dao-home/DAOHeader";
import { BountyCategories } from "./dao-home/BountyCategories";
import { DAOProposals } from "./dao-home/DAOProposals";
import { ProgressUpdates } from "./dao-home/ProgressUpdates";
import { DAODocuments } from "./dao-home/DAODocuments";
import { DAOConstitution } from "./dao-home/DAOConstitution";
import { DAOAboutPanel } from "./dao-home/DAOAboutPanel";
import { DAOOrganizations } from "./dao-home/DAOOrganizations";
import { DAOProfileTab } from "./dao-home/DAOProfileTab";
import { DAOLineage } from "./dao-home/DAOLineage";
import { DAOForkWizard } from "./dao-home/DAOForkWizard";
import { DAOBudget } from "./dao-home/DAOBudget";
import { ModulePlaceholder } from "./dao-home/ModulePlaceholder";
import { DAOModuleSettings } from "./dao-home/DAOModuleSettings";
import { DAOOverview } from "./dao-home/DAOOverview";
import { DAOProductTabPanel } from "./dao-home/DAOProductTabPanel";
import { findDAOById } from "@/data/dao";
import { useDAOModules } from "@/app/hooks/useDAOModules";
import type { DAOModule } from "@/types";

type TabModule = Exclude<DAOModule, "protocolCard">;
type ProductTab = "overview" | "tasks" | "governance" | "knowledge" | "organization";

/**
 * Registry of modules that render as their own Tab. `protocolCard` is
 * intentionally excluded — it's pinned above the Tabs as a banner card.
 * Modules without a dedicated component fall through to ModulePlaceholder.
 */
const TAB_COMPONENTS: Partial<Record<TabModule, React.ComponentType>> = {
  profile: DAOProfileTab,
  constitution: DAOConstitution,
  subOrgs: DAOOrganizations,
  bounties: BountyCategories,
  proposals: DAOProposals,
  discussion: ProgressUpdates,
  docs: DAODocuments,
  budget: DAOBudget,
};

const PRODUCT_TAB_MODULES: Record<ProductTab, TabModule[]> = {
  overview: ["profile"],
  tasks: ["bounties", "kanban", "contributions", "events"],
  governance: ["proposals", "budget", "constitution", "paramGov", "tokenGov", "arbitration", "metrics", "snapshot", "safe"],
  knowledge: ["discussion", "docs", "notionEmbed", "discordEmbed"],
  organization: ["lineage", "subOrgs"],
};

export function DAOHomePage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const dao = id ? findDAOById(id) : undefined;
  const [showFork, setShowFork] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeProductTab, setActiveProductTab] = useState<ProductTab>("overview");

  useEffect(() => {
    setShowFork(false);
    setShowSettings(false);
    setActiveProductTab("overview");
  }, [id]);

  // Reactive: override > dao.modules > LEGACY_MODULES, always canonically ordered.
  const enabledModules = useDAOModules(dao);

  if (!dao) return null;

  const hasChildren = Boolean(
    (dao as unknown as { children?: unknown[] }).children &&
      ((dao as unknown as { children: unknown[] }).children.length > 0),
  );
  const showProtocolCard = enabledModules.includes("protocolCard");
  const availableModules = enabledModules.filter((m): m is TabModule => {
    if (m === "protocolCard") return false;
    if (m === "subOrgs" && !hasChildren) return false;
    return true;
  });

  const visibleProductTabs = (Object.keys(PRODUCT_TAB_MODULES) as ProductTab[]).filter((tab) => {
    if (tab === "overview") return true;
    return PRODUCT_TAB_MODULES[tab].some((m) => availableModules.includes(m));
  });

  const selectProductTab = (tab: ProductTab) => {
    if (visibleProductTabs.includes(tab)) {
      setActiveProductTab(tab);
    }
  };

  const renderModule = (m: TabModule) => {
    const Component = TAB_COMPONENTS[m];
    if (m === "lineage") return <DAOLineage onFork={() => setShowFork(true)} />;
    if (Component) return <Component />;
    return <ModulePlaceholder module={m} />;
  };

  const renderProductTab = (tab: ProductTab) => {
    if (tab === "overview") {
      return (
        <DAOOverview
          dao={dao}
          showProtocolCard={showProtocolCard}
          onSelectTab={selectProductTab}
        />
      );
    }
    const modules = PRODUCT_TAB_MODULES[tab].filter((m) => availableModules.includes(m));
    return <DAOProductTabPanel dao={dao} tab={tab} modules={modules} renderModule={renderModule} />;
  };

  return (
    <div className="flex flex-col xl:flex-row min-h-0">
      {/* Main content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
        <DAOHeader />

        {showFork ? (
          <DAOForkWizard onClose={() => setShowFork(false)} />
        ) : showSettings ? (
          <DAOModuleSettings dao={dao} onClose={() => setShowSettings(false)} />
        ) : (
          <>
            {visibleProductTabs.length > 0 && (
              <Tabs
                value={activeProductTab}
                onValueChange={(value) => selectProductTab(value as ProductTab)}
              >
                {/* Tab list with horizontal scroll on narrow screens */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="overflow-x-auto scrollbar-none flex-1 min-w-0">
                    <TabsList className="bg-secondary inline-flex whitespace-nowrap min-w-full sm:min-w-0">
                      {visibleProductTabs.map((tab) => (
                        <TabsTrigger key={tab} value={tab}>
                          {t(`dao.productTab.${tab}` as never)}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="shrink-0 gap-1.5 border-border text-muted-foreground"
                    onClick={() => setShowSettings(true)}
                  >
                    <Settings2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{t("dao.moduleSettings.entry")}</span>
                  </Button>
                </div>

                {visibleProductTabs.map((tab) => {
                  return (
                    <TabsContent key={tab} value={tab}>
                      {renderProductTab(tab)}
                    </TabsContent>
                  );
                })}
              </Tabs>
            )}
          </>
        )}
      </div>

      {/* Right about panel */}
      <DAOAboutPanel dao={dao} />
    </div>
  );
}
