import { Link } from "react-router";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { useTranslation } from "react-i18next";

interface BountyCardProps {
  id?: string;
  titleKey: string;
  daoKey: string;
  timeKey: string;
  amount: string | null;
  statusKey: string;
  skills: string[];
}

export function BountyCard({ id, titleKey, daoKey, timeKey, amount, statusKey, skills }: BountyCardProps) {
  const { t } = useTranslation();
  const daoLabel = daoKey.startsWith("bounty.") ? t(daoKey) : daoKey;

  const content = (
    <Card className="bg-card border-border hover:border-foreground/20 transition cursor-pointer h-full overflow-hidden p-3 sm:p-4 flex flex-col gap-2">
      {/* Header: Avatar + Title + DAO */}
      <div className="flex items-start gap-2.5 min-w-0">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent flex items-center justify-center text-foreground shrink-0 text-sm sm:text-base font-medium">
          {t(titleKey).charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-sm">{t(titleKey)}</p>
          <p className="text-muted-foreground text-xs truncate mt-0.5">{daoLabel}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap items-center gap-1">
        {skills.map((s) => (
          <Badge key={s} variant="outline" className="text-muted-foreground text-[0.6rem] px-1.5 py-0">
            {t(s)}
          </Badge>
        ))}
      </div>

      {/* Footer: Time + Amount/Status */}
      <div className="flex items-center justify-between gap-2 mt-auto">
        <span className="text-muted-foreground text-[0.7rem] whitespace-nowrap">{t(timeKey)}</span>
        {amount ? (
          <span className="text-foreground text-sm font-semibold whitespace-nowrap">{amount}</span>
        ) : (
          <Badge className="bg-accent text-muted-foreground border-0 text-[0.7rem] whitespace-nowrap">
            {t(statusKey)}
          </Badge>
        )}
      </div>
    </Card>
  );

  if (id) {
    return <Link to={`/bounties/${id}`} className="block min-w-0">{content}</Link>;
  }

  return content;
}
