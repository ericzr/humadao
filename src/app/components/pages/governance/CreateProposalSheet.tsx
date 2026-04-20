import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { useTranslation } from "react-i18next";
import type { Proposal } from "@/types";

const PROPOSAL_TYPES = ["budget", "rule", "personnel", "partnership", "experiment", "other"] as const;
const DEADLINES = ["3d", "7d", "14d", "30d"] as const;
const DAOS = ["peaq", "莱克斯DAO", "元游戏", "Nation3", "Agent 市场", "真知沉淀"];

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (p: Proposal) => void;
}

export function CreateProposalSheet({ open, onClose, onCreated }: Props) {
  const { t } = useTranslation();
  const [type, setType] = useState<string>("budget");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dao, setDao] = useState(DAOS[0]);
  const [deadline, setDeadline] = useState<string>("7d");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const valid = title.trim().length > 0 && desc.trim().length > 0;

  const reset = () => {
    setType("budget");
    setTitle("");
    setDesc("");
    setDao(DAOS[0]);
    setDeadline("7d");
    setSubmitting(false);
    setDone(false);
  };

  const handleSubmit = async () => {
    if (!valid) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const newProposal: Proposal = {
      id: Date.now(),
      titleKey: title,
      descKey: desc,
      author: "我",
      dao,
      statusKey: "governance.filter.discussion",
      forVotes: 0,
      againstVotes: 0,
      abstain: 0,
      voters: 0,
      deadlineKey: t(`governance.create.deadlines.${deadline}`),
      comments: 0,
    };
    onCreated(newProposal);
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
        <SheetHeader className="mb-6">
          <SheetTitle>{t("governance.create.title")}</SheetTitle>
        </SheetHeader>

        {done ? (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-foreground/10 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold">{t("governance.create.success")}</h3>
            <p className="text-muted-foreground text-sm max-w-xs">{t("governance.create.successDesc")}</p>
            <Button className="mt-4 bg-foreground text-background hover:bg-foreground/90" onClick={handleClose}>
              {t("governance.filter.all")}
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Proposal type */}
            <div>
              <p className="text-sm font-medium mb-2">{t("governance.create.typeLabel")}</p>
              <div className="flex flex-wrap gap-2">
                {PROPOSAL_TYPES.map((pt) => (
                  <button
                    key={pt}
                    onClick={() => setType(pt)}
                    className={`px-3 py-1.5 rounded-full text-xs transition border ${
                      type === pt
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    }`}
                  >
                    {t(`governance.create.types.${pt}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-medium block mb-1.5">
                {t("governance.create.titleLabel")} <span className="text-destructive">*</span>
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("governance.create.titlePlaceholder")}
                className="bg-secondary border-border"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium block mb-1.5">
                {t("governance.create.descLabel")} <span className="text-destructive">*</span>
              </label>
              <Textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={t("governance.create.descPlaceholder")}
                rows={5}
                className="bg-secondary border-border resize-none"
              />
            </div>

            {/* DAO */}
            <div>
              <label className="text-sm font-medium block mb-1.5">{t("governance.create.daoLabel")}</label>
              <div className="flex flex-wrap gap-2">
                {DAOS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDao(d)}
                    className={`px-3 py-1.5 rounded-full text-xs transition border ${
                      dao === d
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="text-sm font-medium block mb-1.5">{t("governance.create.deadlineLabel")}</label>
              <div className="flex gap-2">
                {DEADLINES.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDeadline(d)}
                    className={`flex-1 py-1.5 rounded-md text-xs transition border ${
                      deadline === d
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    }`}
                  >
                    {t(`governance.create.deadlines.${d}`)}
                  </button>
                ))}
              </div>
            </div>

            {!valid && (
              <p className="text-xs text-muted-foreground">{t("governance.create.requiredHint")}</p>
            )}

            <Button
              className="w-full bg-foreground text-background hover:bg-foreground/90 mt-2"
              disabled={!valid || submitting}
              onClick={handleSubmit}
            >
              {submitting ? t("governance.create.submitting") : t("governance.create.submit")}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
