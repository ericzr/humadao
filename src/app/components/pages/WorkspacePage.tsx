import { useState } from "react";
import { LogContributionSheet } from "./workspace/LogContributionSheet";
import { WorkspaceHeader } from "./workspace/WorkspaceHeader";
import { CollaborationDatabase } from "./workspace/CollaborationDatabase";

export function WorkspacePage() {
  const [logOpen, setLogOpen] = useState(false);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <WorkspaceHeader onLogContribution={() => setLogOpen(true)} />
      <CollaborationDatabase />

      <LogContributionSheet open={logOpen} onClose={() => setLogOpen(false)} />
    </div>
  );
}
