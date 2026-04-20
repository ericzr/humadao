import {
  Scale,
  Users,
  Vote,
  Wallet,
  Shield,
  FilePen,
  ChevronRight,
} from "lucide-react";
import { Card } from "../../ui/card";
import { useTranslation } from "react-i18next";

const sections = [
  {
    icon: Scale,
    titleKey: "dao.const.principlesTitle",
    items: [
      "dao.const.principles.mission",
      "dao.const.principles.vision",
      "dao.const.principles.values",
    ],
  },
  {
    icon: Users,
    titleKey: "dao.const.governanceTitle",
    items: [
      "dao.const.governance.committee",
      "dao.const.governance.roles",
      "dao.const.governance.decision",
    ],
  },
  {
    icon: Vote,
    titleKey: "dao.const.votingTitle",
    items: [
      "dao.const.voting.threshold",
      "dao.const.voting.cycle",
      "dao.const.voting.quorum",
      "dao.const.voting.pass",
    ],
  },
  {
    icon: Wallet,
    titleKey: "dao.const.treasuryTitle",
    items: [
      "dao.const.treasury.management",
      "dao.const.treasury.budget",
      "dao.const.treasury.distribution",
    ],
  },
  {
    icon: Shield,
    titleKey: "dao.const.membersTitle",
    items: [
      "dao.const.members.join",
      "dao.const.members.conduct",
      "dao.const.members.dispute",
    ],
  },
  {
    icon: FilePen,
    titleKey: "dao.const.amendmentTitle",
    items: [
      "dao.const.amendment.process",
      "dao.const.amendment.effective",
    ],
  },
] as const;

export function DAOConstitution() {
  const { t } = useTranslation();

  return (
    <>
      <div className="mb-6">
        <h2 className="mb-1">{t("dao.const.title")}</h2>
        <p className="text-sm text-muted-foreground">{t("dao.const.subtitle")}</p>
      </div>

      <Card className="bg-accent/40 border-primary/20 p-4 mb-6 flex items-start gap-3">
        <Scale className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium mb-1">{t("dao.const.smartContractNote")}</p>
          <p className="text-muted-foreground">{t("dao.const.smartContractNoteDesc")}</p>
        </div>
      </Card>

      <div className="grid gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.titleKey} className="bg-card border-border p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-medium">{t(section.titleKey)}</h3>
              </div>
              <div className="space-y-3 pl-11">
                {section.items.map((itemKey) => (
                  <div
                    key={itemKey}
                    className="flex items-start gap-2 text-sm group cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0 group-hover:text-primary transition" />
                    <span className="text-muted-foreground group-hover:text-foreground transition">
                      {t(itemKey)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-6 text-center">
        {t("dao.const.footer")}
      </p>
    </>
  );
}
