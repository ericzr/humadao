import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";
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
const REQUEST_TYPES = ["record", "confirm", "settle"] as const;
type RequestType = (typeof REQUEST_TYPES)[number];

interface Props {
  open: boolean;
  onClose: () => void;
  initialType?: ContribType;
  initialDaoId?: string;
  initialHours?: string;
  initialSummary?: string;
  onLogged?: (payload: {
    type: ContribType;
    daoId: string;
    hours: number;
    summary: string;
    outcome: string;
    verification: string;
    request: RequestType;
  }) => void;
}

export function LogContributionSheet({
  open,
  onClose,
  initialType,
  initialDaoId,
  initialHours,
  initialSummary,
  onLogged,
}: Props) {
  const { t } = useTranslation();
  const defaultDaoId = initialDaoId && myDAOs.some((d) => d.id === initialDaoId)
    ? initialDaoId
    : myDAOs[0]?.id ?? "";
  const [type, setType] = useState<ContribType>(initialType ?? "coordination");
  const [daoId, setDaoId] = useState(defaultDaoId);
  const [hours, setHours] = useState(initialHours ?? "");
  const [summary, setSummary] = useState(initialSummary ?? "");
  const [outcome, setOutcome] = useState("");
  const [verification, setVerification] = useState("");
  const [request, setRequest] = useState<RequestType>("confirm");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const valid =
    Boolean(type) &&
    Boolean(daoId) &&
    summary.trim().length > 0 &&
    outcome.trim().length > 0 &&
    verification.trim().length > 0;

  const reset = () => {
    setType(initialType ?? "coordination");
    setDaoId(defaultDaoId);
    setHours(initialHours ?? "");
    setSummary(initialSummary ?? "");
    setOutcome("");
    setVerification("");
    setRequest("confirm");
    setSubmitting(false);
    setDone(false);
  };

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, initialType, initialDaoId, initialHours, initialSummary]);

  const handleSubmit = async () => {
    if (!valid) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    onLogged?.({
      type,
      daoId,
      hours: Number(hours) || 0,
      summary: summary.trim(),
      outcome: outcome.trim(),
      verification: verification.trim(),
      request,
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
      <SheetContent side="right" className="w-full overflow-hidden sm:max-w-xl">
        <SheetHeader className="border-b border-border px-5 py-4 pr-10">
          <SheetTitle>{t("workspace.contrib.logTitle")}</SheetTitle>
          <SheetDescription className="leading-6">
            {t("workspace.contrib.logDesc")}
          </SheetDescription>
        </SheetHeader>

        {done ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-5 py-16 text-center">
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
          <>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
              <div className="space-y-6">
                <section className="rounded-md border border-border bg-secondary/40 px-3 py-3">
                  <p className="text-xs font-medium">{t("workspace.contrib.packageTitle")}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {t("workspace.contrib.packageDesc")}
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-1.5 text-[11px] text-muted-foreground">
                    <span className="rounded-md bg-background px-2 py-1 text-center">
                      {t("workspace.contrib.trust.self")}
                    </span>
                    <span className="rounded-md bg-background px-2 py-1 text-center">
                      {t("workspace.contrib.trust.package")}
                    </span>
                    <span className="rounded-md bg-background px-2 py-1 text-center">
                      {t("workspace.contrib.trust.org")}
                    </span>
                  </div>
                </section>

                <section className="space-y-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {t("workspace.contrib.typeLabel")} <span className="text-destructive">*</span>
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {CONTRIB_TYPES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setType(c)}
                        className={`min-h-9 rounded-md border px-3 py-2 text-left text-xs transition ${
                          type === c
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-secondary text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                        }`}
                      >
                        {t(`workspace.contrib.types.${c}`)}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {t("workspace.contrib.daoLabel")} <span className="text-destructive">*</span>
                  </p>
                  <div className="grid max-h-56 grid-cols-1 gap-2 overflow-y-auto rounded-md border border-border p-2 sm:grid-cols-2">
                    {myDAOs.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDaoId(d.id)}
                        className={`flex min-h-10 items-center gap-2 rounded-md border px-3 py-2 text-left text-xs transition ${
                          daoId === d.id
                            ? "border-foreground bg-foreground text-background"
                            : "border-transparent bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-sm ${d.color} flex shrink-0 items-center justify-center text-[10px] text-white`}
                        >
                          {d.avatar}
                        </span>
                        <span className="min-w-0 truncate">{t(d.nameKey)}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <div>
                    <label htmlFor="contrib-summary" className="text-sm font-medium">
                      {t("workspace.contrib.summaryLabel")} <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="contrib-summary"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder={t("workspace.contrib.summaryPlaceholder")}
                      rows={4}
                      className="mt-2 min-h-24 resize-none bg-secondary border-border"
                    />
                  </div>

                  <div>
                    <label htmlFor="contrib-outcome" className="text-sm font-medium">
                      {t("workspace.contrib.outcomeLabel")} <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="contrib-outcome"
                      value={outcome}
                      onChange={(e) => setOutcome(e.target.value)}
                      placeholder={t("workspace.contrib.outcomePlaceholder")}
                      rows={3}
                      className="mt-2 min-h-20 resize-none bg-secondary border-border"
                    />
                  </div>

                  <div>
                    <label htmlFor="contrib-verification" className="text-sm font-medium">
                      {t("workspace.contrib.verificationLabel")} <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="contrib-verification"
                      value={verification}
                      onChange={(e) => setVerification(e.target.value)}
                      placeholder={t("workspace.contrib.verificationPlaceholder")}
                      rows={3}
                      className="mt-2 min-h-20 resize-none bg-secondary border-border"
                    />
                  </div>
                </section>

                <section className="grid gap-4 sm:grid-cols-[160px_minmax(0,1fr)]">
                  <div>
                    <label htmlFor="contrib-hours" className="text-sm font-medium">
                      {t("workspace.contrib.hoursLabel")}
                    </label>
                    <Input
                      id="contrib-hours"
                      type="number"
                      min="0"
                      step="0.5"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      placeholder="0"
                      className="mt-2 bg-secondary border-border"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {t("workspace.contrib.requestLabel")}
                    </p>
                    <div className="mt-2 grid gap-2 sm:grid-cols-3">
                      {REQUEST_TYPES.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setRequest(item)}
                          className={`min-h-9 rounded-md border px-3 py-2 text-left text-xs transition ${
                            request === item
                              ? "border-foreground bg-foreground text-background"
                              : "border-border bg-secondary text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                          }`}
                        >
                          {t(`workspace.contrib.requests.${item}`)}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <SheetFooter className="border-t border-border bg-background px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                {!valid ? t("workspace.contrib.requiredHint") : ""}
              </p>
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <Button variant="outline" onClick={handleClose}>
                  {t("common.cancel")}
                </Button>
                <Button disabled={!valid || submitting} onClick={handleSubmit}>
                  {submitting ? t("workspace.contrib.submitting") : t("workspace.contrib.submit")}
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
