import { Suspense, lazy } from "react";
import { Outlet, useLocation } from "react-router";
import { AppSidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import {
  SidebarProvider,
  SidebarInset,
} from "../ui/sidebar";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { LoadingFallback } from "../common/LoadingFallback";
import { WalletProvider } from "@/contexts/WalletContext";

const VisionGraphic = lazy(() =>
  import("../pages/home/VisionGraphic").then((m) => ({ default: m.VisionGraphic })),
);

export function AppLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <WalletProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <TopBar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <ErrorBoundary key={pathname}>
              <Suspense fallback={<LoadingFallback />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
            {isHome && (
              <Suspense fallback={null}>
                <VisionGraphic />
              </Suspense>
            )}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </WalletProvider>
  );
}
