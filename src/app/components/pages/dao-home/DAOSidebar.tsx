import { Code, Target, Globe, Megaphone } from "lucide-react";
import { Button } from "../../ui/button";
import { useTranslation } from "react-i18next";

const navItems = [
  "dao.nav.overview" as const,
  "dao.nav.proposals" as const,
  "dao.nav.leaderboard" as const,
  "dao.nav.committee" as const,
];

const bountyNav = [
  { nameKey: "dao.cat.engineering" as const, icon: Code },
  { nameKey: "dao.cat.grants" as const, icon: Target },
  { nameKey: "dao.cat.ecosystem" as const, icon: Globe },
  { nameKey: "dao.cat.community" as const, icon: Megaphone },
];

export function DAOSidebar() {
  const { t } = useTranslation();

  return (
    <div className="w-56 border-r border-border p-4 space-y-1 shrink-0 hidden lg:block">
      <Button variant="outline" className="w-full mb-4 border-border text-foreground">
        {t("dao.newProposal")}
      </Button>
      <p className="text-muted-foreground px-2 mb-2 text-xs">{t("dao.navigation")}</p>
      {navItems.map((item) => (
        <button
          key={item}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition text-sm"
        >
          {t(item)}
        </button>
      ))}
      <p className="text-muted-foreground px-2 mt-4 mb-2 text-xs">{t("dao.bountyNav")}</p>
      {bountyNav.map((c) => (
        <button
          key={c.nameKey}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition text-sm"
        >
          <c.icon className="w-4 h-4" /> {t(c.nameKey)}
        </button>
      ))}
    </div>
  );
}
