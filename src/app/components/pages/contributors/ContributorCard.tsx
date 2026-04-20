import { Link } from "react-router";
import { HelpCircle, Layers3, MapPin } from "lucide-react";
import { Card } from "../../ui/card";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { SkillBadgeGroup } from "../../common/SkillBadge";
import { useTranslation } from "react-i18next";
import type { Contributor } from "@/types";
import { getLocationPath, locationTree } from "@/data/location";

export function ContributorCard({
  id,
  name,
  rep,
  typeKey,
  bio,
  available,
  skills,
  roleAssignments,
  participationLevel,
  locationId,
}: Contributor) {
  const { t } = useTranslation();
  const locationLabel = locationId ? getLocationPath(locationId, locationTree, t) : null;
  const roles = Array.from(new Set(roleAssignments.map((a) => a.role)));
  const daoCount = new Set(roleAssignments.map((a) => a.daoId)).size;

  return (
    <Link to={`/profile/${id}`}>
      <Card className="bg-card border-border hover:border-foreground/20 transition cursor-pointer h-full p-3 sm:p-4 flex flex-col gap-2">
        {/* Header: Avatar + Info + Status */}
        <div className="flex items-start gap-2.5">
          <Avatar className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 mt-0.5">
            <AvatarFallback className="bg-accent text-foreground text-sm">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium text-sm truncate">{name}</p>
              <div className="shrink-0 flex items-center gap-1.5">
                {available && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400/60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                )}
                <Badge variant="outline" className="text-muted-foreground text-[0.6rem] px-1.5 py-0">
                  {t(`contributors.participation.${participationLevel}`)}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground text-[0.7rem] mt-0.5">
              <span className="whitespace-nowrap">{t(typeKey)}：{rep.toLocaleString()}</span>
              <HelpCircle className="w-3 h-3 shrink-0" />
            </div>

            {locationLabel && (
              <div className="flex items-center gap-1 text-muted-foreground text-[0.65rem] mt-0.5">
                <MapPin className="w-2.5 h-2.5 shrink-0" />
                <span className="truncate">{locationLabel}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{bio}</p>

        {/* Footer: DAO count + Roles */}
        <div className="flex items-center flex-wrap gap-1.5 mt-auto">
          <span className="inline-flex items-center gap-1 text-[0.65rem] text-muted-foreground">
            <Layers3 className="w-3 h-3" />
            {daoCount} DAO
          </span>
          {roles.slice(0, 2).map((role) => (
            <Badge key={role} variant="outline" className="text-muted-foreground text-[0.6rem] px-1.5 py-0">
              {t(`contributors.role.${role}`)}
            </Badge>
          ))}
        </div>

        {/* Skills */}
        <SkillBadgeGroup skills={skills} max={3} />
      </Card>
    </Link>
  );
}
