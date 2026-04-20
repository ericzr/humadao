import { Link } from "react-router";
import { ArrowUpRight, Star } from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { SkillBadgeGroup } from "../../common/SkillBadge";
import { useTranslation } from "react-i18next";
import { townHallDAOs } from "@/data";
import type { ContributionRecord, Contributor } from "@/types";

interface ContributionListProps {
  contributor: Contributor;
  timeline: ContributionRecord[];
}

export function ContributionList({ contributor, timeline }: ContributionListProps) {
  const { t } = useTranslation();
  const daoMap = new Map(townHallDAOs.map((dao) => [dao.id, dao]));

  return (
    <>
      <Card className="bg-card border-border p-4 sm:p-5">
        <h2 className="mb-4">{t("profile.featuredWork")}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {contributor.profile.featuredWorks.map((work) => {
            const dao = daoMap.get(work.daoId);
            return (
              <Link
                key={`${work.daoId}-${work.title}`}
                to={`/dao/${work.daoId}`}
                className="bg-secondary rounded-lg overflow-hidden hover:ring-1 hover:ring-foreground/20 transition"
              >
                <div className={`h-24 sm:h-28 ${dao?.color ?? "bg-accent"} flex items-end p-4`}>
                  <div className="text-white/90 text-xs">{dao ? t(dao.nameKey) : work.daoId}</div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm">{work.title}</p>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </div>
                  <p className="text-muted-foreground text-xs mt-2 leading-5">{work.summary}</p>
                  <div className="mt-3">
                    <SkillBadgeGroup skills={work.skillTags} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Card>

      <Card className="bg-card border-border p-4 sm:p-5">
        <h2 className="mb-4">
          {t("profile.reviews")}{" "}
          <Badge className="ml-1 bg-secondary text-muted-foreground border-0">{contributor.profile.reviews.length}</Badge>
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {contributor.profile.reviews.map((review) => (
            <div key={`${review.from}-${review.relationship}`} className="bg-secondary rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">{review.from}</span>
                <span className="text-muted-foreground text-xs">{review.duration}</span>
              </div>
              <p className="text-muted-foreground text-xs mb-3">{review.relationship}</p>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-foreground/40 fill-foreground/40" />
                ))}
              </div>
              <p className="text-sm leading-6">{review.highlight}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-card border-border p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <h2>{t("profile.currentFootprint")}</h2>
          <Badge className="bg-foreground/10 text-foreground border-0">{timeline.length}</Badge>
        </div>
        <div className="space-y-3">
          {timeline.slice(0, 4).map((record) => {
            const dao = daoMap.get(record.daoId);
            return (
              <div key={record.id} className="bg-secondary rounded-lg p-3 sm:p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm">{record.title}</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-muted-foreground text-xs">{dao ? t(dao.nameKey) : record.daoId}</span>
                      <span className="text-muted-foreground text-xs">{record.date}</span>
                      {record.role && (
                        <Badge variant="outline" className="text-[0.65rem]">
                          {t(`contributors.role.${record.role}`)}
                        </Badge>
                      )}
                    </div>
                    {record.desc && <p className="text-muted-foreground text-xs mt-2 leading-5">{record.desc}</p>}
                  </div>
                  {dao && (
                    <div className={`w-8 h-8 rounded-full ${dao.color} flex items-center justify-center shrink-0 text-white`}>
                      <span className="text-[0.7rem]">{dao.avatar}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}
