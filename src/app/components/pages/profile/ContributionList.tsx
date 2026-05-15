import { Link } from "react-router";
import { Badge } from "../../ui/badge";
import { useTranslation } from "react-i18next";
import { townHallDAOs } from "@/data";
import type { Contributor } from "@/types";

interface ContributionListProps {
  contributor: Contributor;
}

export function ContributionList({ contributor }: ContributionListProps) {
  const { t } = useTranslation();
  const daoMap = new Map(townHallDAOs.map((dao) => [dao.id, dao]));
  const groupedDaos = contributor.roleAssignments.reduce<
    Array<{ daoId: string; roles: Set<string>; areas: Set<string>; active: boolean }>
  >((groups, assignment) => {
    let group = groups.find((item) => item.daoId === assignment.daoId);
    if (!group) {
      group = { daoId: assignment.daoId, roles: new Set(), areas: new Set(), active: false };
      groups.push(group);
    }
    group.roles.add(assignment.role);
    assignment.contributionAreas.forEach((area) => group?.areas.add(area));
    group.active = group.active || ["active", "stewarding", "advising"].includes(assignment.status);
    return groups;
  }, []);

  return (
    <div className="space-y-5">
      <section>
        <div className="mb-4">
          <div>
            <h2>{t("profile.participatingOrganizations")}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{t("profile.participatingOrganizationsHint")}</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {groupedDaos.map((group) => {
            const dao = daoMap.get(group.daoId);
            const roles = Array.from(group.roles);
            const areas = Array.from(group.areas).slice(0, 3);

            return (
              <Link
                key={group.daoId}
                to={`/dao/${group.daoId}`}
                className="rounded-lg border border-border bg-card p-4 transition hover:border-primary/40"
              >
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ${dao?.color ?? "bg-accent"}`}>
                    {dao?.avatar ?? group.daoId.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-medium">{dao ? t(dao.nameKey) : group.daoId}</p>
                      <Badge
                        variant="outline"
                        className={`shrink-0 text-[0.65rem] ${
                          group.active ? "border-green-500/30 text-green-600 dark:text-green-400" : "text-muted-foreground"
                        }`}
                      >
                        {group.active ? t("profile.daoActive") : t("profile.daoPast")}
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {roles.map((role) => (
                        <Badge key={`${group.daoId}-${role}`} variant="secondary" className="text-[0.65rem]">
                          {t(`contributors.role.${role}`)}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {areas.map((area) => (
                        <Badge key={`${group.daoId}-${area}`} variant="outline" className="text-[0.65rem] text-muted-foreground">
                          {t(`contributors.contribution.${area}`)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
