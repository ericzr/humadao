import { useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { GitFork, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card";
import { findDAOById } from "@/data/dao";
import type { DAORelation, ForkInheritance } from "@/types";

const RELATION_OPTIONS: DAORelation[] = ["project", "regional", "functional", "ideological", "experimental"];

const INHERIT_KEYS: (keyof ForkInheritance)[] = [
  "mission", "members", "knowledgeBase", "treasury", "reputation", "federation",
];

const defaultInheritance: ForkInheritance = {
  mission: true,
  members: false,
  knowledgeBase: true,
  treasury: false,
  reputation: true,
  federation: true,
};

export function DAOForkWizard({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const parentDAO = findDAOById(id!);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState<DAORelation>("project");
  const [inheritance, setInheritance] = useState<ForkInheritance>(defaultInheritance);
  const [reason, setReason] = useState("");

  const toggleInherit = (key: keyof ForkInheritance) => {
    setInheritance((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const steps = [
    t("fork.step.basic"),
    t("fork.step.inherit"),
    t("fork.step.confirm"),
  ];

  if (!parentDAO) return null;

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <GitFork className="h-5 w-5 text-primary" />
          {t("fork.title")}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {t("fork.subtitle", { name: t(parentDAO.nameKey) })}
        </p>
        <div className="flex items-center gap-2 mt-3">
          {steps.map((label, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold
                ${i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {i < step ? <Check className="h-3 w-3" /> : i + 1}
              </div>
              <span className={`text-xs ${i === step ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {label}
              </span>
              {i < steps.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground mx-1" />}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {step === 0 && (
          <>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t("fork.name")}</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("fork.namePlaceholder")}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t("fork.relation")}</label>
              <div className="flex flex-wrap gap-2">
                {RELATION_OPTIONS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRelation(r)}
                    className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors
                      ${relation === r ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/30"}`}
                  >
                    {t(`lineage.relation.${r}`)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t("fork.reason")}</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={t("fork.reasonPlaceholder")}
                rows={2}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </>
        )}

        {step === 1 && (
          <div>
            <p className="text-sm text-muted-foreground mb-3">{t("fork.inheritDesc")}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {INHERIT_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => toggleInherit(key)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors
                    ${inheritance[key] ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-primary/30"}`}
                >
                  <div className={`flex h-4 w-4 items-center justify-center rounded border
                    ${inheritance[key] ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}>
                    {inheritance[key] && <Check className="h-3 w-3" />}
                  </div>
                  {t(`lineage.inherit.${key}`)}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="rounded-lg bg-muted/50 p-4 space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">{t("fork.summary")}</span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
              <span className="text-muted-foreground">{t("fork.name")}:</span>
              <span className="font-medium">{name || "—"}</span>
              <span className="text-muted-foreground">{t("fork.parent")}:</span>
              <span>{t(parentDAO.nameKey)}</span>
              <span className="text-muted-foreground">{t("fork.relation")}:</span>
              <span>{t(`lineage.relation.${relation}`)}</span>
              <span className="text-muted-foreground">{t("fork.reason")}:</span>
              <span>{reason || "—"}</span>
              <span className="text-muted-foreground">{t("fork.inheritItems")}:</span>
              <span>
                {INHERIT_KEYS.filter((k) => inheritance[k]).map((k) => t(`lineage.inherit.${k}`)).join("、") || "—"}
              </span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={step === 0 ? onClose : () => setStep(step - 1)}>
          {step === 0 ? t("common.cancel") : t("common.back")}
        </Button>
        {step < 2 ? (
          <Button onClick={() => setStep(step + 1)} disabled={step === 0 && !name.trim()}>
            {t("common.next")}
          </Button>
        ) : (
          <Button onClick={onClose}>
            <GitFork className="mr-1.5 h-4 w-4" />
            {t("fork.confirm")}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
