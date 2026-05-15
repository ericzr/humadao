import { Link } from "react-router";
import {
  CheckCircle2,
  ChevronRight,
  FileSearch,
  GraduationCap,
  Shield,
  Users,
  Vote,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { StatusBadge } from "./StatusBadge";
import type { ContributionRecord, ContributionType, DAO } from "@/types";

const TYPE_CONFIG: Record<ContributionType, { icon: typeof CheckCircle2; labelKey: string }> = {
  task: { icon: CheckCircle2, labelKey: "contrib.type.task" },
  proposal: { icon: Vote, labelKey: "contrib.type.proposal" },
  governance: { icon: Shield, labelKey: "contrib.type.governance" },
  community: { icon: Users, labelKey: "contrib.type.community" },
  review: { icon: FileSearch, labelKey: "contrib.type.review" },
  education: { icon: GraduationCap, labelKey: "contrib.type.education" },
};

interface ContributionRecordCardProps {
  record: ContributionRecord;
  dao?: DAO;
  href?: string;
}

export function ContributionRecordCard({ record, dao, href }: ContributionRecordCardProps) {
  const { t } = useTranslation();
  const config = TYPE_CONFIG[record.type];
  const Icon = config.icon;
  const content = (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium">{record.title}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-[0.65rem]">
                {t(config.labelKey)}
              </Badge>
              {record.status && (
                <StatusBadge label={record.status} status={record.status} className="text-[0.65rem]" showIcon={false} />
              )}
              {record.role && (
                <Badge variant="outline" className="text-[0.65rem]">
                  {t(`contributors.role.${record.role}`)}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground sm:justify-end">
            {dao && (
              <span className={`flex h-6 w-6 items-center justify-center rounded-md text-[0.65rem] font-bold text-white ${dao.color}`}>
                {dao.avatar}
              </span>
            )}
            <span>{dao ? t(dao.nameKey) : record.daoId}</span>
            <span>·</span>
            <span>{record.date}</span>
            {href && <ChevronRight className="h-3.5 w-3.5" />}
          </div>
        </div>
        {record.desc && <p className="mt-2 text-xs leading-5 text-muted-foreground">{record.desc}</p>}
      </div>
    </div>
  );

  const className = "block rounded-lg border border-border bg-card p-3 transition hover:border-foreground/20 sm:p-4";

  if (href) {
    return (
      <Link to={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
