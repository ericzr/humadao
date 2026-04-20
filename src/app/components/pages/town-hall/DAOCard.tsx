import { Link } from "react-router";
import { Users, Star } from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { useTranslation } from "react-i18next";
import { ValuesTags } from "../../shared/ValuesTags";
import { SpectrumTags } from "../../shared/SpectrumTags";
import type { DAO } from "@/types";

interface Props {
  dao: DAO;
}

export function DAOCard({ dao }: Props) {
  const { t } = useTranslation();
  const { id, nameKey, descKey, members, featured, profile, projectType, avatar } = dao;

  return (
    <Link to={`/dao/${id}`}>
      <Card className="bg-card border-border hover:border-foreground/20 transition cursor-pointer h-full p-3 sm:p-4 flex flex-col gap-2">
        {/* Header: Avatar + Name + Members */}
        <div className="flex items-start gap-2.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent flex items-center justify-center text-foreground shrink-0 text-sm sm:text-base font-medium">
            {(avatar ?? t(nameKey).charAt(0)).charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-medium text-sm truncate">{t(nameKey)}</span>
                {featured && <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-[0.7rem] shrink-0">
                <Users className="w-3 h-3" />
                <span>{members.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mt-0.5">{t(descKey)}</p>
          </div>
        </div>

        {/* Tags: project type + values + spectrum in one flow */}
        <div className="flex flex-wrap items-center gap-1 mt-auto">
          {projectType && (
            <Badge variant="outline" className="text-muted-foreground text-[0.6rem] px-1.5 py-0">
              {t(`townHall.filter.projectTypes.${projectType}` as never)}
            </Badge>
          )}
          {profile && <ValuesTags values={profile.values} threshold={70} max={1} />}
          {profile && <SpectrumTags spectrum={profile.spectrum} max={1} />}
        </div>
      </Card>
    </Link>
  );
}
