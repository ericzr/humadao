export type ContributorScoreType = "contributors.reputation" | "contributors.prestige";

export type ContributorRole =
  | "initiator"
  | "coBuilder"
  | "coordinator"
  | "reviewer"
  | "connector"
  | "host";

export type ParticipationLevel = "observer" | "temporary" | "active" | "core" | "governance";

export type ContributorContributionArea =
  | "task"
  | "governance"
  | "education"
  | "community"
  | "coordination"
  | "care"
  | "research"
  | "content";

export type CollaborationMode =
  | "online"
  | "offline"
  | "hybrid"
  | "longTerm"
  | "shortTerm"
  | "visionDriven"
  | "taskDriven";

/**
 * Three-layer skill value cluster system
 * Layer 1 (Human Core): AI cannot replace — direction, consensus, care, governance
 * Layer 2 (Human-led): AI assists heavily — structure, narrative, aesthetics, network, product, knowledge
 * Layer 3 (Execution): AI does most, human stays accountable — engineering, creative, operations, education, care service, field
 */
export type SkillLayer = 1 | 2 | 3;

// Layer 1: Human Core (4 value clusters)
export type Layer1Skill =
  | "directionSensing"
  | "consensusBuilding"
  | "emotionalCare"
  | "governanceDecision";

// Layer 2: Human-led, AI-assisted (6 value clusters)
export type Layer2Skill =
  | "structureDesign"
  | "narrativeExpression"
  | "experienceAesthetics"
  | "networkWeaving"
  | "productInsight"
  | "knowledgeProduction";

// Layer 3: Execution (6 value clusters)
export type Layer3Skill =
  | "engineering"
  | "creativeProduction"
  | "operationsData"
  | "educationTraining"
  | "careService"
  | "fieldExecution";

export type ContributorSkill = Layer1Skill | Layer2Skill | Layer3Skill;

export type ContributorAssignmentStatus = "active" | "stewarding" | "advising" | "paused" | "completed";

export type ContributorAssignmentScope = "dao" | "project" | "initiative";

export type ContributorReputationMetricKey =
  | "profile.rep.taskCompletion"
  | "profile.rep.governance"
  | "profile.rep.communityEngagement"
  | "profile.rep.peerReview"
  | "profile.rep.mentorship";

export interface ContributorRoleAssignment {
  daoId: string;
  role: ContributorRole;
  scope: ContributorAssignmentScope;
  status: ContributorAssignmentStatus;
  since: string;
  until?: string;
  reputation: number;
  contributionAreas: ContributorContributionArea[];
  note: string;
}

export interface ContributorProfileLink {
  type: "github" | "linkedin" | "twitter" | "website" | "telegram" | "external";
  label: string;
  href: string;
}

export interface ContributorFeaturedWork {
  title: string;
  summary: string;
  daoId: string;
  skillTags: ContributorSkill[];
}

export interface ContributorReview {
  from: string;
  relationship: string;
  duration: string;
  highlight: string;
}

export interface ContributorReputationBreakdown {
  labelKey: ContributorReputationMetricKey;
  value: number;
}

export interface ContributorHistoryPoint {
  label: string;
  value: number;
}

export interface ContributorProfile {
  headline: string;
  languages: string[];
  focus: string;
  links: ContributorProfileLink[];
  featuredWorks: ContributorFeaturedWork[];
  reviews: ContributorReview[];
  reputationBreakdown: ContributorReputationBreakdown[];
  reputationHistory: ContributorHistoryPoint[];
  earningsUsd: number;
  revenueShare: number;
}

export interface Contributor {
  id: string;
  name: string;
  rep: number;
  typeKey: ContributorScoreType;
  bio: string;
  available: boolean;
  participationLevel: ParticipationLevel;
  skills: ContributorSkill[];
  roleAssignments: ContributorRoleAssignment[];
  contributionAreas: ContributorContributionArea[];
  collaborationModes: CollaborationMode[];
  locationId?: string;
  profile: ContributorProfile;
}

export interface TopContributor {
  id: string;
  name: string;
  rep: number;
  skills: ContributorSkill[];
}

export type ContributionType = "task" | "proposal" | "governance" | "community" | "review" | "education";

export interface ContributionRecord {
  id: string;
  contributorId: string;
  type: ContributionType;
  title: string;
  daoId: string;
  date: string;
  desc?: string;
  status?: string;
  role?: ContributorRole;
}
