import { useMemo, useState } from "react";
import { TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { useTranslation } from "react-i18next";
import type { Contributor } from "@/types";

interface ReputationCardProps {
  contributor: Contributor;
}

function MiniBarChart({ data }: { data: Contributor["profile"]["reputationHistory"] }) {
  const max = Math.max(...data.map((point) => point.value));

  return (
    <div className="flex items-end gap-1.5 h-14">
      {data.map((point, index) => (
        <div key={point.label} className="flex-1 flex flex-col items-center gap-1">
          <div
            className={`w-full rounded-t transition-all ${
              index === data.length - 1 ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            style={{ height: `${(point.value / max) * 100}%` }}
          />
          <span className="text-[0.6rem] text-muted-foreground">{point.label}</span>
        </div>
      ))}
    </div>
  );
}

export function ReputationCard({ contributor }: ReputationCardProps) {
  const { t } = useTranslation();
  const [showBreakdown, setShowBreakdown] = useState(false);
  const total = useMemo(
    () => contributor.profile.reputationBreakdown.reduce((sum, item) => sum + item.value, 0),
    [contributor.profile.reputationBreakdown]
  );

  return (
    <Card className="bg-card border-border p-4 sm:p-5">
      {/* Score row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-muted-foreground text-sm">{t("profile.reputationScore")}</span>
        <Badge className="bg-green-500/10 text-green-400 border-0 text-[0.65rem]">
          <TrendingUp className="w-3 h-3 mr-1" />
          {Math.round((contributor.rep / Math.max(total, 1)) * 100)}%
        </Badge>
      </div>
      <p className="text-3xl">{contributor.rep.toLocaleString()}</p>

      {/* Mini chart */}
      <div className="mt-4">
        <MiniBarChart data={contributor.profile.reputationHistory} />
        <p className="text-muted-foreground text-[0.65rem] mt-1 text-center">
          {t("profile.rep.last6Months")}
        </p>
      </div>

      {/* Earnings */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-secondary p-3">
          <p className="text-muted-foreground text-xs">{t("profile.earnings")}</p>
          <p className="mt-1 text-sm font-medium">
            {contributor.profile.earningsUsd.toLocaleString()} USD
          </p>
        </div>
        <div className="rounded-lg bg-secondary p-3">
          <p className="text-muted-foreground text-xs">{t("profile.earningsShare")}</p>
          <p className="mt-1 text-sm font-medium">
            {contributor.profile.revenueShare.toFixed(1)} %
          </p>
        </div>
      </div>

      {/* Breakdown toggle */}
      <button
        onClick={() => setShowBreakdown((v) => !v)}
        className="w-full mt-3 flex items-center justify-center gap-1 text-muted-foreground text-xs hover:text-foreground transition py-1"
      >
        {showBreakdown ? t("profile.rep.hideBreakdown") : t("profile.rep.showBreakdown")}
        {showBreakdown ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {showBreakdown && (
        <div className="mt-2 space-y-2 border-t border-border pt-3">
          {contributor.profile.reputationBreakdown.map((item) => {
            const pct = ((item.value / total) * 100).toFixed(1);
            return (
              <div key={item.labelKey} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm">
                    <span className="truncate">{t(item.labelKey)}</span>
                    <span className="shrink-0 ml-2">{item.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-secondary mt-1">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <span className="text-muted-foreground text-xs shrink-0 w-10 text-right">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
