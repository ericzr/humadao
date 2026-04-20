import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { useTranslation } from "react-i18next";
import { myDAOs } from "@/data";

const CONTRIB_TYPES = [
  "coordination",
  "education",
  "community",
  "care",
  "mediation",
  "documentation",
  "content",
  "outreach",
] as const;

type ContribType = (typeof CONTRIB_TYPES)[number];

interface Props {
  open: boolean;
  onClose: () => void;
  onLogged?: (payload: {
    type: ContribType;
    daoId: string;
    hours: number;
    summary: string;
  }) => void;
}

export function LogContributionSheet({ open, onClose, onLogged }: Props) {
  const { t } = useTranslation();
  const [type, setType] = useState<ContribType>("coordination");
  const [daoId, setDaoId] = useState(myDAOs[0]?.id ?? "");
  const [hours, setHours] = useState("");
  const [summary, setSummary] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const valid = Boolean(type) && Boolean(daoId) && summary.trim().length > 0;

  const reset = () => {
    setType("coordination");
    setDaoId(myDAOs[0]?.id ?? "");
    setHours("");
    setSummary("");
    setSubmitting(false);
    setDone(false);
  };

  const handleSubmit = async () => {
    if (!valid) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    onLogged?.({
      type,
      daoId,
      hours: Number(hours) || 0,
      summary: summary.trim(),
    });
    setSubmitting(false);
    setDone(true);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && handleClose()}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>{t("workspace.contrib.logTitle")}</SheetTitle>
          <p className="text-muted-foreground text-sm mt-1">{t("workspace.contrib.logDesc")}</p>
        </SheetHeader>

        {done ? (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">{t("workspace.contrib.success")}</h3>
            <p className="text-muted-foreground text-sm max-w-xs leading-6">
              {t("workspace.contrib.successDesc")}
            </p>
            <Button className="mt-4" onClick={handleClose}>
              {t("workspace.viewAll")}
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Type */}
            <div>
              <p className="text-sm font-medium mb-2">
                {t("workspace.contrib.typeLabel")} <span className="text-destructive">*</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {CONTRIB_TYPES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setType(c)}
                    className={`px-3 py-1.5 rounded-full text-xs transition border ${
                      type === c
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    }`}
                  >
                    {t(`workspace.contrib.types.${c}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* DAO */}
            <div>
              <label className="text-sm font-medium block mb-2">
                {t("workspace.contrib.daoLabel")} <span className="text-destructive">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {myDAOs.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDaoId(d.id)}
                    className={`px-3 py-1.5 rounded-full text-xs transition border flex items-center gap-1.5 ${
                      daoId === d.id
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-sm ${d.color} flex items-center justify-center text-[10px] text-white`}
                    >
                      {d.avatar}
                    </span>
                    {t(d.nameKey)}
                  </button>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div>
              <label className="text-sm font-medium block mb-1.5">
                {t("workspace.contrib.hoursLabel")}
              </label>
              <Input
                type="number"
                min="0"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="0"
                className="bg-secondary border-border"
              />
            </div>

            {/* Summary */}
            <div>
              <label className="text-sm font-medium block mb-1.5">
                {t("workspace.contrib.summaryLabel")} <span className="text-destructive">*</span>
              </label>
              <Textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder={t("workspace.contrib.summaryPlaceholder")}
                rows={5}
                className="bg-secondary border-border resize-none"
              />
            </div>

            {!valid && (
              <p className="text-xs text-muted-foreground">
                {t("workspace.contrib.requiredHint")}
              </p>
            )}

            <Button
              className="w-full mt-2"
              disabled={!valid || submitting}
              onClick={handleSubmit}
            >
              {submitting ? t("workspace.contrib.submitting") : t("workspace.contrib.submit")}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
