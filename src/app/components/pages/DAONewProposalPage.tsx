import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, CheckCircle2, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { findDAOById } from "@/data/dao";
import { proposals } from "@/data";
import type { Proposal } from "@/types";

const PROPOSAL_TYPES = ["budget", "rule", "personnel", "partnership", "experiment", "other"] as const;
const DEADLINES = ["3d", "7d", "14d", "30d"] as const;

export function DAONewProposalPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dao = id ? findDAOById(id) : undefined;
  const [type, setType] = useState<string>("budget");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState<string>("7d");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  if (!dao) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>{t("dao.governancePage.notFound")}</p>
        <Link to="/town-hall" className="mt-2 inline-block text-primary hover:underline">
          {t("dao.governancePage.backTownHall")}
        </Link>
      </div>
    );
  }

  const valid = title.trim().length > 0 && desc.trim().length > 0;

  const handleSubmit = async () => {
    if (!valid) return;
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    const newProposal: Proposal = {
      id: Date.now(),
      daoId: dao.id,
      titleKey: title,
      descKey: desc,
      author: "我",
      dao: t(dao.nameKey as never),
      statusKey: "governance.filter.discussion",
      forVotes: 0,
      againstVotes: 0,
      abstain: 0,
      voters: 0,
      deadlineKey: t(`governance.create.deadlines.${deadline}`),
      comments: 0,
    };
    proposals.unshift(newProposal);
    setSubmitting(false);
    setDone(true);
    setTimeout(() => navigate(`/dao/${dao.id}/governance`), 600);
  };

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <Link to={`/dao/${dao.id}/governance`} className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        {t("dao.governancePage.backToDAO")}
      </Link>

      <div className="mb-6 border-b border-border pb-5">
        <p className="mb-2 text-sm text-muted-foreground">{t(dao.nameKey as never)}</p>
        <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
          {t("governance.create.title")}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
          {t("dao.governancePage.subtitle")}
        </p>
      </div>

      <Card className="border-border bg-card p-4 sm:p-5">
        {done ? (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground/10">
              <CheckCircle2 className="h-7 w-7 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold">{t("governance.create.success")}</h3>
            <p className="max-w-xs text-sm text-muted-foreground">{t("governance.create.successDesc")}</p>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <p className="mb-2 text-sm font-medium">{t("governance.create.typeLabel")}</p>
              <div className="flex flex-wrap gap-2">
                {PROPOSAL_TYPES.map((pt) => (
                  <button
                    key={pt}
                    onClick={() => setType(pt)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition ${
                      type === pt
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {t(`governance.create.types.${pt}`)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {t("governance.create.titleLabel")} <span className="text-destructive">*</span>
              </label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("governance.create.titlePlaceholder")} className="border-border bg-secondary" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                {t("governance.create.descLabel")} <span className="text-destructive">*</span>
              </label>
              <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder={t("governance.create.descPlaceholder")} rows={6} className="resize-none border-border bg-secondary" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">{t("governance.create.deadlineLabel")}</label>
              <div className="flex gap-2">
                {DEADLINES.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDeadline(d)}
                    className={`flex-1 rounded-md border py-1.5 text-xs transition ${
                      deadline === d
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {t(`governance.create.deadlines.${d}`)}
                  </button>
                ))}
              </div>
            </div>

            {!valid && <p className="text-xs text-muted-foreground">{t("governance.create.requiredHint")}</p>}

            <Button className="w-full gap-1.5 bg-foreground text-background hover:bg-foreground/90" disabled={!valid || submitting} onClick={handleSubmit}>
              <Plus className="h-4 w-4" />
              {submitting ? t("governance.create.submitting") : t("governance.create.submit")}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
