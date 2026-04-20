import { useState } from "react";
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
import { MinimumProtocolCard } from "./dao-home/MinimumProtocolCard";
import { ModulePlaceholder } from "./dao-home/ModulePlaceholder";
import { DAOModuleSettings } from "./dao-home/DAOModuleSettings";
import { findDAOById } from "@/data/dao";
import { MODULE_META } from "@/data";
import { useDAOModules } from "@/app/hooks/useDAOModules";
import type { DAOModule } from "@/types";

type TabModule = Exclude<DAOModule, "protocolCard">;

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

export function DAOHomePage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const dao = id ? findDAOById(id) : undefined;
  const [showFork, setShowFork] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Reactive: override > dao.modules > LEGACY_MODULES, always canonically ordered.
  const enabledModules = useDAOModules(dao);

  if (!dao) return null;

  const hasChildren = Boolean(
    (dao as unknown as { children?: unknown[] }).children &&
      ((dao as unknown as { children: unknown[] }).children.length > 0),
  );
  const showProtocolCard = enabledModules.includes("protocolCard");
  const tabModules = enabledModules.filter((m): m is TabModule => {
    if (m === "protocolCard") return false;
    if (m === "subOrgs" && !hasChildren) return false;
    return true;
  });

  // Pick a default tab — first available module, preferring profile if enabled.
  const defaultTab = tabModules.includes("profile") ? "profile" : tabModules[0];

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
            {showProtocolCard && (
              <div className="mb-6">
                <MinimumProtocolCard dao={dao} />
              </div>
            )}

            {tabModules.length > 0 && defaultTab && (
              <Tabs defaultValue={defaultTab}>
                {/* Tab list with horizontal scroll on narrow screens */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="overflow-x-auto scrollbar-none flex-1 min-w-0">
                    <TabsList className="bg-secondary inline-flex whitespace-nowrap min-w-full sm:min-w-0">
                      {tabModules.map((m) => (
                        <TabsTrigger key={m} value={m}>
                          {t(MODULE_META[m].labelKey)}
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

                {tabModules.map((m) => {
                  const Component = TAB_COMPONENTS[m];
                  return (
                    <TabsContent key={m} value={m}>
                      {m === "lineage" ? (
                        <DAOLineage onFork={() => setShowFork(true)} />
                      ) : Component ? (
                        <Component />
                      ) : (
                        <ModulePlaceholder module={m} />
                      )}
                    </TabsContent>
                  );
                })}
              </Tabs>
            )}
          </>
        )}
      </div>

      {/* Right about panel */}
      <DAOAboutPanel />
    </div>
  );
}
