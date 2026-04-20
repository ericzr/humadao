import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Network, Sparkles } from "lucide-react";
import { townHallDAOs } from "@/data";
import type { Contributor, ContributorRoleAssignment } from "@/types";

interface CrossDAOIdentityProps {
  contributor: Contributor;
}

interface GroupedAssignment {
  daoId: string;
  assignments: ContributorRoleAssignment[];
}

export function CrossDAOIdentity({ contributor }: CrossDAOIdentityProps) {
  const { t } = useTranslation();
  const daoMap = useMemo(() => new Map(townHallDAOs.map((dao) => [dao.id, dao])), []);
  const groupedAssignments = useMemo<GroupedAssignment[]>(() => {
    const groups = new Map<string, ContributorRoleAssignment[]>();

    contributor.roleAssignments.forEach((assignment) => {
      const items = groups.get(assignment.daoId) ?? [];
      items.push(assignment);
      groups.set(assignment.daoId, items);
    });

    return Array.from(groups.entries()).map(([daoId, assignments]) => ({
      daoId,
      assignments: assignments.sort((left, right) => right.since.localeCompare(left.since)),
    }));
  }, [contributor.roleAssignments]);
  const totalReputation = Math.round(
    contributor.roleAssignments.reduce((sum, assignment) => sum + assignment.reputation, 0) / Math.max(contributor.roleAssignments.length, 1),
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Network className="h-5 w-5 text-primary" />
          {t("crossDAO.title")}
        </CardTitle>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
          <span>{t("crossDAO.daoCount", { count: groupedAssignments.length })}</span>
          <span>·</span>
          <span>{t("crossDAO.avgReputation", { value: totalReputation })}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-5 mt-2">{t("crossDAO.relationshipHint")}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {groupedAssignments.map(({ daoId, assignments }) => {
            const dao = daoMap.get(daoId);
            if (!dao) return null;

            return (
              <div key={daoId} className="rounded-lg border border-border p-3 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white ${dao.color}`}>
                    {dao.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{t(dao.nameKey)}</p>
                    <p className="text-xs text-muted-foreground">
                      {assignments.length} {t("crossDAO.relationships")}
                    </p>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  {assignments.map((assignment) => (
                    <div key={`${assignment.daoId}-${assignment.role}-${assignment.since}`} className="rounded-lg bg-secondary p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <Badge className="bg-background text-foreground border-0 text-[0.7rem]">
                              {t(`contributors.role.${assignment.role}`)}
                            </Badge>
                            <Badge variant="outline" className="text-[0.7rem]">
                              {t(`contributors.assignmentStatus.${assignment.status}`)}
                            </Badge>
                            <Badge variant="secondary" className="text-[0.7rem]">
                              {t(`contributors.scope.${assignment.scope}`)}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2 leading-5">{assignment.note}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm tabular-nums">{assignment.reputation}</div>
                          <div className="text-[0.7rem] text-muted-foreground">{assignment.since}</div>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {assignment.contributionAreas.map((area) => (
                          <Badge key={`${assignment.daoId}-${assignment.role}-${area}`} variant="outline" className="text-[0.65rem]">
                            <Sparkles className="w-3 h-3 mr-1" />
                            {t(`contributors.contribution.${area}`)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
