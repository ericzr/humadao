import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  CheckCircle2,
  Vote,
  Shield,
  Users,
  FileSearch,
  GraduationCap,
} from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { townHallDAOs } from "@/data";
import type { ContributionRecord, ContributionType, Contributor } from "@/types";

const TYPE_CONFIG: Record<ContributionType, { icon: typeof CheckCircle2; colorClass: string; labelKey: string }> = {
  task: { icon: CheckCircle2, colorClass: "text-green-500 bg-green-500/10", labelKey: "contrib.type.task" },
  proposal: { icon: Vote, colorClass: "text-blue-500 bg-blue-500/10", labelKey: "contrib.type.proposal" },
  governance: { icon: Shield, colorClass: "text-purple-500 bg-purple-500/10", labelKey: "contrib.type.governance" },
  community: { icon: Users, colorClass: "text-orange-500 bg-orange-500/10", labelKey: "contrib.type.community" },
  review: { icon: FileSearch, colorClass: "text-cyan-500 bg-cyan-500/10", labelKey: "contrib.type.review" },
  education: { icon: GraduationCap, colorClass: "text-yellow-500 bg-yellow-500/10", labelKey: "contrib.type.education" },
};

interface ContributionTimelineProps {
  contributor: Contributor;
  timeline: ContributionRecord[];
}

export function ContributionTimeline({ contributor, timeline }: ContributionTimelineProps) {
  const { t } = useTranslation();
  const daoMap = new Map(townHallDAOs.map((dao) => [dao.id, dao]));

  return (
    <Card className="bg-card border-border p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <h2 className="font-semibold">{t("contrib.timelineTitle")}</h2>
        <Badge variant="outline" className="text-xs">
          {contributor.name}
        </Badge>
      </div>

      <div className="relative pl-6 border-l-2 border-border space-y-6">
        {timeline.map((record) => {
          const config = TYPE_CONFIG[record.type];
          const Icon = config.icon;
          const dao = daoMap.get(record.daoId);

          return (
            <div key={record.id} className="relative">
              <div className={`absolute -left-[21px] w-5 h-5 rounded-full flex items-center justify-center ${config.colorClass}`}>
                <Icon className="w-3 h-3" />
              </div>

              <div className="pb-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <Badge variant="secondary" className="text-xs gap-1">
                    <Icon className="w-3 h-3" />
                    {t(config.labelKey)}
                  </Badge>
                  <Link to={`/dao/${record.daoId}`} className="text-xs text-primary hover:underline">
                    {dao ? t(dao.nameKey) : record.daoId}
                  </Link>
                  <span className="text-xs text-muted-foreground">{record.date}</span>
                  {record.role && (
                    <Badge variant="outline" className="text-[0.65rem]">
                      {t(`contributors.role.${record.role}`)}
                    </Badge>
                  )}
                </div>

                <p className="text-sm font-medium">{record.title}</p>

                {record.desc && <p className="text-xs text-muted-foreground mt-1 leading-5">{record.desc}</p>}

                {record.status && (
                  <Badge variant="outline" className="mt-2 text-xs">
                    {record.status}
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
