import { MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { useTranslation } from "react-i18next";
import type { Proposal } from "@/types";
import { governanceComments } from "@/data";

interface ProposalDetailProps {
  proposal: Proposal;
}

export function ProposalDetail({ proposal }: ProposalDetailProps) {
  const { t } = useTranslation();

  const comments = governanceComments;

  return (
    <Card className="bg-card border-border p-4 sm:p-5 sticky top-8">
      <Badge className="bg-secondary text-muted-foreground border-0 mb-3">{t(proposal.statusKey)}</Badge>
      <h2 className="mb-2">{t(proposal.titleKey)}</h2>
      <p className="text-muted-foreground mb-4 text-sm">{t(proposal.descKey)}</p>

      <div className="space-y-3 mb-4">
        {([
          { labelKey: "governance.proposer", value: proposal.author },
          { labelKey: "governance.belongsTo", value: proposal.dao },
          { labelKey: "governance.deadline", value: t(proposal.deadlineKey) },
          { labelKey: "governance.voterCount", value: proposal.voters.toString() },
        ]).map((item) => (
          <div key={item.labelKey} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t(item.labelKey)}</span><span>{item.value}</span>
          </div>
        ))}
      </div>

      {proposal.statusKey === "governance.filter.voting" && (
        <div className="space-y-2">
          <Button className="w-full bg-foreground text-background hover:bg-foreground/90"><ThumbsUp className="w-4 h-4 mr-1" /> {t("governance.voteFor")}</Button>
          <Button variant="outline" className="w-full border-border text-foreground hover:bg-accent"><ThumbsDown className="w-4 h-4 mr-1" /> {t("governance.voteAgainst")}</Button>
          <Button variant="outline" className="w-full border-border text-muted-foreground hover:bg-accent">{t("governance.voteAbstain")}</Button>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-border">
        <h3 className="mb-3 flex items-center gap-2">
          <MessageCircle className="w-4 h-4" /> {t("governance.discussion")}
          <Badge className="bg-secondary text-muted-foreground border-0 text-[0.7rem]">{proposal.comments}</Badge>
        </h3>
        <div className="space-y-3">
          {comments.map((c, i) => (
            <div key={i} className="bg-secondary rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-foreground text-sm">{c.user}</span>
                <span className="text-muted-foreground text-[0.7rem]">{t(c.timeKey)}</span>
              </div>
              <p className="text-muted-foreground text-sm">{t(c.textKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
