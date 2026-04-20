import { useTranslation } from "react-i18next";
import { Target, Users, Scale, GitBranch, Handshake } from "lucide-react";
import { Card } from "../../ui/card";
import type { DAO, DAOProtocol, LocalizedText } from "@/types";

function localizeText(copy: LocalizedText | undefined, language: string) {
  if (!copy) return "";
  return language.startsWith("en") ? copy.en : copy.zh;
}

/**
 * Build a display-ready protocol from whatever the DAO has defined.
 * - If the DAO declares a full `protocol`, use it verbatim.
 * - Otherwise, synthesise a reasonable default from `showcase` fields so
 *   early-stage DAOs still present the "minimum consensus" surface,
 *   with a fallback copy that invites the community to fill it in.
 */
function resolveProtocol(dao: DAO): DAOProtocol | undefined {
  if (dao.protocol) return dao.protocol;
  const s = dao.showcase;
  if (!s) return undefined;

  const exitPlaceholder: LocalizedText = {
    zh: "本 DAO 暂未正式约定分歧出口，默认遵循平台级建议：任何成员可发起暂停、申诉或分叉流程，治理中心会记录全过程。",
    en: "This DAO has not yet ratified an exit clause. By default, any member may pause, appeal, or fork a decision; the governance center records the full trail.",
  };

  return {
    sharedGoal: s.vision,
    roleInterface: s.participation,
    settlementRule: s.businessModel,
    exitClause: exitPlaceholder,
  };
}

const cells: Array<{
  key: keyof DAOProtocol;
  labelKey: string;
  descKey: string;
  icon: typeof Target;
  accent: string;
}> = [
  {
    key: "sharedGoal",
    labelKey: "dao.protocol.sharedGoal",
    descKey: "dao.protocol.sharedGoalDesc",
    icon: Target,
    accent: "text-sky-500 bg-sky-500/10",
  },
  {
    key: "roleInterface",
    labelKey: "dao.protocol.roleInterface",
    descKey: "dao.protocol.roleInterfaceDesc",
    icon: Users,
    accent: "text-amber-500 bg-amber-500/10",
  },
  {
    key: "settlementRule",
    labelKey: "dao.protocol.settlementRule",
    descKey: "dao.protocol.settlementRuleDesc",
    icon: Scale,
    accent: "text-emerald-500 bg-emerald-500/10",
  },
  {
    key: "exitClause",
    labelKey: "dao.protocol.exitClause",
    descKey: "dao.protocol.exitClauseDesc",
    icon: GitBranch,
    accent: "text-rose-500 bg-rose-500/10",
  },
];

interface MinimumProtocolCardProps {
  dao: DAO;
}

export function MinimumProtocolCard({ dao }: MinimumProtocolCardProps) {
  const { t, i18n } = useTranslation();
  const protocol = resolveProtocol(dao);
  if (!protocol) return null;

  const isSynthesised = !dao.protocol;

  return (
    <Card className="bg-card border-border p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Handshake className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base">{t("dao.protocol.title")}</h3>
          <p className="text-muted-foreground text-xs mt-0.5 leading-5">
            {t("dao.protocol.subtitle")}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {cells.map((cell) => {
          const Icon = cell.icon;
          const copy = protocol[cell.key];
          return (
            <div
              key={cell.key}
              className="rounded-lg border border-border bg-secondary/40 p-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-7 h-7 rounded-md flex items-center justify-center ${cell.accent}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{t(cell.labelKey)}</p>
                  <p className="text-[11px] text-muted-foreground leading-4">
                    {t(cell.descKey)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-5">
                {localizeText(copy, i18n.language)}
              </p>
            </div>
          );
        })}
      </div>

      {isSynthesised && (
        <p className="text-[11px] text-muted-foreground mt-3 leading-5">
          {t("dao.protocol.synthesisedHint")}
        </p>
      )}
    </Card>
  );
}
