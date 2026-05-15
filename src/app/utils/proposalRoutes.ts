import type { Proposal } from "@/types";

export function proposalPath(proposal: Proposal) {
  return `/dao/${proposal.daoId}/proposals/${proposal.id}`;
}

export function proposalBackPath(proposal: Proposal, hasDaoContext: boolean) {
  if (!hasDaoContext) return "/governance";
  if (proposal.daoId === "peaq" || proposal.daoId === "lex-dao" || proposal.daoId === "metagame" || proposal.daoId === "nation3") {
    return "/workspace";
  }
  return `/dao/${proposal.daoId}`;
}
