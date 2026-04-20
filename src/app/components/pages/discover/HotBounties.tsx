import { Link } from "react-router";
import { Flame, Award } from "lucide-react";
import { Card } from "../../ui/card";
import { useTranslation } from "react-i18next";

const hotBounties = [
  { titleKey: "discover.bounty.audit" as const, amount: "¥16,500", applicants: 12 },
  { titleKey: "discover.bounty.frontend" as const, amount: "¥3,000", applicants: 8 },
  { titleKey: "discover.bounty.docs" as const, amount: "¥800", applicants: 3 },
];

export function HotBounties() {
  const { t } = useTranslation();

  return (
    <Card className="bg-card border-border p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2"><Flame className="w-4 h-4 text-muted-foreground" /> {t("discover.hotBounties")}</h3>
        <Link to="/bounties" className="text-muted-foreground hover:text-foreground transition text-xs">{t("discover.viewAll")}</Link>
      </div>
      <div className="space-y-3">
        {hotBounties.map((b) => (
          <Link to="/bounties" key={b.titleKey} className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-accent transition">
            <div className="flex items-center gap-3 min-w-0">
              <Award className="w-5 h-5 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <span className="text-sm block truncate">{t(b.titleKey)}</span>
                <p className="text-muted-foreground text-xs">{b.applicants} {t("discover.applicants")}</p>
              </div>
            </div>
            <span className="text-foreground text-sm shrink-0 ml-2">{b.amount}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
