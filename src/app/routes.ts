import { createBrowserRouter } from "react-router";
import { AppLayout } from "./components/layout/AppLayout";
import { LoadingFallback } from "./components/common/LoadingFallback";

const lazy = (importFn: () => Promise<{ [key: string]: React.ComponentType }>, name: string) =>
  () => importFn().then((m) => ({ Component: m[name] }));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    HydrateFallback: LoadingFallback,
    children: [
      { index: true, lazy: lazy(() => import("./components/pages/HomePage"), "HomePage") },
      { path: "discover", lazy: lazy(() => import("./components/pages/DiscoverPage"), "DiscoverPage") },
      { path: "town-hall", lazy: lazy(() => import("./components/pages/TownHallPage"), "TownHallPage") },
      { path: "dao/:id", lazy: lazy(() => import("./components/pages/DAOHomePage"), "DAOHomePage") },
      { path: "dao/:id/sub/:subId", lazy: lazy(() => import("./components/pages/SubDAOPage"), "SubDAOPage") },
      { path: "bounties", lazy: lazy(() => import("./components/pages/BountyPoolPage"), "BountyPoolPage") },
      { path: "bounties/:id", lazy: lazy(() => import("./components/pages/BountyDetailPage"), "BountyDetailPage") },
      { path: "contributors", lazy: lazy(() => import("./components/pages/ContributorsPage"), "ContributorsPage") },
      { path: "profile/:id?", lazy: lazy(() => import("./components/pages/ProfilePage"), "ProfilePage") },
      { path: "workspace", lazy: lazy(() => import("./components/pages/WorkspacePage"), "WorkspacePage") },
      { path: "governance", lazy: lazy(() => import("./components/pages/GovernancePage"), "GovernancePage") },
      { path: "governance/:id", lazy: lazy(() => import("./components/pages/ProposalDetailPage"), "ProposalDetailPage") },
      { path: "chat", lazy: lazy(() => import("./components/pages/ChatPage"), "ChatPage") },
      { path: "create-project", lazy: lazy(() => import("./components/pages/CreateProjectPage"), "CreateProjectPage") },
      { path: "bookmarks", lazy: lazy(() => import("./components/pages/BookmarksPage"), "BookmarksPage") },
      { path: "whitepaper", lazy: lazy(() => import("./components/pages/WhitepaperPage"), "WhitepaperPage") },
      { path: "*", lazy: lazy(() => import("./components/pages/HomePage"), "HomePage") },
    ],
  },
]);
