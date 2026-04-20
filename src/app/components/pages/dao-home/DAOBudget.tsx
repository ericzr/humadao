import { useMemo } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Wallet, TrendingUp, CheckCircle2, Clock, FileText, PlusCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { findDAOById } from "@/data/dao";
import { contributors } from "@/data/contributor";

type CategoryKey =
  | "development"
  | "operations"
  | "marketing"
  | "research"
  | "reserve"
  | "community";

interface CategoryAllocation {
  key: CategoryKey;
  allocated: number;
  spent: number;
  tone: string;
}

interface ProposalEntry {
  id: string;
  title: string;
  amount: number;
  status: "approved" | "pending" | "rejected";
  date: string;
}

/**
 * Derive a stable, readable mock budget snapshot from the DAO's size.
 * In production this would come from an on-chain treasury + settlement ledger.
 */
function buildBudget(members: number) {
  // Scale the total budget to the DAO size so larger orgs show bigger numbers.
  const totalBudget = Math.max(80_000, members * 420);
  const breakdown: CategoryAllocation[] = [
    { key: "development", allocated: 0.32, spent: 0.22, tone: "bg-sky-500" },
    { key: "operations", allocated: 0.18, spent: 0.12, tone: "bg-emerald-500" },
    { key: "marketing", allocated: 0.12, spent: 0.08, tone: "bg-amber-500" },
    { key: "research", allocated: 0.14, spent: 0.06, tone: "bg-violet-500" },
    { key: "community", allocated: 0.16, spent: 0.09, tone: "bg-rose-500" },
    { key: "reserve", allocated: 0.08, spent: 0.0, tone: "bg-slate-500" },
  ].map((c) => ({
    ...c,
    allocated: Math.round(totalBudget * c.allocated),
    spent: Math.round(totalBudget * c.spent),
  }));

  const allocated = breakdown.reduce((s, c) => s + c.allocated, 0);
  const spent = breakdown.reduce((s, c) => s + c.spent, 0);
  const remaining = totalBudget - spent;

  return { totalBudget, allocated, spent, remaining, breakdown };
}

function buildProposals(): ProposalEntry[] {
  return [
    {
      id: "bp-1",
      title: "Q2 贡献者结算池扩容",
      amount: 28_000,
      status: "approved",
      date: "2026-03-14",
    },
    {
      id: "bp-2",
      title: "研究反应器主题轮次赞助",
      amount: 12_000,
      status: "pending",
      date: "2026-03-20",
    },
    {
      id: "bp-3",
      title: "面向新协作者的入场激励计划",
      amount: 6_500,
      status: "pending",
      date: "2026-03-22",
    },
  ];
}

function formatUsd(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${n}`;
}

function StatusBadge({ status }: { status: ProposalEntry["status"] }) {
  const { t } = useTranslation();
  const tone =
    status === "approved"
      ? "bg-emerald-500/10 text-emerald-500"
      : status === "pending"
      ? "bg-amber-500/10 text-amber-500"
      : "bg-rose-500/10 text-rose-500";
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${tone}`}>
      {t(`dao.budget.status.${status}`)}
    </span>
  );
}

export function DAOBudget() {
  const { t } = useTranslation();
  const { id } = useParams();
  const dao = id ? findDAOById(id) : undefined;

  const budget = useMemo(() => buildBudget(dao?.members ?? 100), [dao?.members]);
  const proposals = useMemo(() => buildProposals(), []);

  // Top earners in this DAO: contributors with a role assignment here,
  // ranked by their reputation for that assignment.
  const topEarners = useMemo(() => {
    if (!dao) return [];
    return contributors
      .map((c) => {
        const here = c.roleAssignments.find((a) => a.daoId === dao.id);
        if (!here) return null;
        return { id: c.id, name: c.name, reputation: here.reputation, role: here.role };
      })
      .filter((x): x is NonNullable<typeof x> => Boolean(x))
      .sort((a, b) => b.reputation - a.reputation)
      .slice(0, 5);
  }, [dao]);

  if (!dao) {
    return <p className="text-muted-foreground text-sm">{t("dao.budget.noData")}</p>;
  }

  const stats = [
    {
      key: "total",
      value: formatUsd(budget.totalBudget),
      icon: Wallet,
      accent: "text-sky-500 bg-sky-500/10",
    },
    {
      key: "allocated",
      value: formatUsd(budget.allocated),
      icon: CheckCircle2,
      accent: "text-emerald-500 bg-emerald-500/10",
    },
    {
      key: "spent",
      value: formatUsd(budget.spent),
      icon: TrendingUp,
      accent: "text-amber-500 bg-amber-500/10",
    },
    {
      key: "remaining",
      value: formatUsd(budget.remaining),
      icon: Clock,
      accent: "text-violet-500 bg-violet-500/10",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Period + CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="mb-0.5">{t("dao.budget.title")}</h3>
          <p className="text-xs text-muted-foreground">{t("dao.budget.period")}</p>
        </div>
        <Button size="sm" variant="outline" className="gap-1.5 self-start sm:self-auto">
          <PlusCircle className="w-4 h-4" />
          {t("dao.budget.propose")}
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.key} className="bg-card border-border p-4">
              <div className={`w-8 h-8 rounded-md flex items-center justify-center mb-2 ${s.accent}`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {t(`dao.budget.${s.key}`)}
              </p>
              <p className="text-lg sm:text-xl font-semibold mt-0.5">{s.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{t("dao.budget.breakdown")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {budget.breakdown.map((c) => {
            const utilisation = c.allocated === 0 ? 0 : Math.round((c.spent / c.allocated) * 100);
            return (
              <div key={c.key}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-2.5 h-2.5 rounded-sm ${c.tone}`} />
                    <span className="font-medium">
                      {t(`dao.budget.categories.${c.key}`)}
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    {formatUsd(c.spent)} / {formatUsd(c.allocated)}
                    <span className="ml-2 text-[10px]">{utilisation}%</span>
                  </span>
                </div>
                <Progress value={utilisation} className="h-1.5" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Top earners + Proposal history — two column on large */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t("dao.budget.topEarners")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {topEarners.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("dao.budget.noData")}</p>
            ) : (
              topEarners.map((e, idx) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between rounded-md bg-secondary/50 px-3 py-2"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-medium flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm truncate">{e.name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {t(`contributors.role.${e.role}` as never, { defaultValue: e.role })}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[11px] shrink-0">
                    {e.reputation} rep
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="w-4 h-4 text-muted-foreground" />
              {t("dao.budget.history")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {proposals.map((p) => (
              <div
                key={p.id}
                className="flex items-start justify-between gap-3 rounded-md bg-secondary/50 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="text-sm leading-snug truncate">{p.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {p.date} · {formatUsd(p.amount)}
                  </p>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
