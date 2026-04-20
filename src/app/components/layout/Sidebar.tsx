import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  Search, Bell, ClipboardList, Bookmark, User,
  Settings, Plus, ChevronRight,
  Award, Users, LayoutGrid, Wallet,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Logo } from "./Logo";
import { useTranslation } from "react-i18next";
import { useWallet } from "@/contexts/WalletContext";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from "../ui/sidebar";
import type { DAOBrief } from "@/types";

const mainNav = [
  { to: "/discover", icon: Search, labelKey: "nav.discover" as const },
  { to: "/town-hall", icon: LayoutGrid, labelKey: "nav.townHall" as const },
  { to: "/bounties", icon: Award, labelKey: "nav.bounties" as const },
  { to: "/contributors", icon: Users, labelKey: "nav.contributors" as const },
];

import { myDAOs } from "@/data";

const personalNav = [
  { to: "/workspace", icon: ClipboardList, labelKey: "nav.workspace" as const },
  { to: "/bookmarks", icon: Bookmark, labelKey: "nav.bookmarks" as const },
  { to: "/profile", icon: User, labelKey: "nav.profile" as const },
];

function DAOMenuItem({ dao, closeMobile }: { dao: DAOBrief; closeMobile: () => void }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const hasChildren = dao.children && dao.children.length > 0;

  if (!hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={t(dao.nameKey as never)}>
          <NavLink to={`/dao/${dao.id}`} onClick={closeMobile}>
            <Avatar className="w-5 h-5 shrink-0">
              <AvatarFallback className={`${dao.color} text-white text-[10px]`}>
                {dao.avatar}
              </AvatarFallback>
            </Avatar>
            <span>{t(dao.nameKey as never)}</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={t(dao.nameKey as never)}
            onClick={() => {
              navigate(`/dao/${dao.id}`);
              closeMobile();
            }}
          >
            <Avatar className="w-5 h-5 shrink-0">
              <AvatarFallback className={`${dao.color} text-white text-[10px]`}>
                {dao.avatar}
              </AvatarFallback>
            </Avatar>
            <span>{t(dao.nameKey as never)}</span>
            <ChevronRight className="ml-auto w-4 h-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {dao.children!.map((sub) => (
              <SidebarMenuSubItem key={sub.id}>
                <SidebarMenuSubButton asChild>
                  <NavLink to={`/dao/${dao.id}/sub/${sub.id}`} onClick={closeMobile}>
                    <Avatar className="w-4 h-4 shrink-0">
                      <AvatarFallback className={`${sub.color} text-white text-[8px]`}>
                        {sub.avatar.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{t(sub.nameKey as never)}</span>
                  </NavLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function AppSidebar() {
  const { t } = useTranslation();
  const { state, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const { status, wallet } = useWallet();

  const closeMobile = () => setOpenMobile(false);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2">
        <NavLink to="/" onClick={closeMobile}>
          <Logo collapsed={collapsed} />
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild tooltip={t(item.labelKey)}>
                    <NavLink to={item.to} onClick={closeMobile}>
                      <item.icon className="w-4 h-4" />
                      <span>{t(item.labelKey)}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <div className="flex min-h-0 flex-1 flex-col">
          <SidebarGroup className="relative min-h-0 flex-1 overflow-hidden">
            <div className="pointer-events-none absolute inset-x-2 top-0 z-10 h-4 bg-gradient-to-b from-sidebar to-transparent" />
            <SidebarGroupContent className="min-h-0 overflow-y-auto overscroll-contain scrollbar-none">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={t("nav.createDAO")}>
                    <NavLink to="/create-project" onClick={closeMobile}>
                      <Plus className="w-4 h-4" />
                      <span>{t("nav.createDAO")}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {myDAOs.map((dao) => (
                  <DAOMenuItem key={dao.id} dao={dao} closeMobile={closeMobile} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            <div className="pointer-events-none absolute inset-x-2 bottom-0 z-10 h-6 bg-gradient-to-t from-sidebar to-transparent" />
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {personalNav.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild tooltip={t(item.labelKey)}>
                      <NavLink to={item.to} onClick={closeMobile}>
                        <item.icon className="w-4 h-4" />
                        <span>{t(item.labelKey)}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>

      <SidebarFooter>
        {status === "connected" && wallet ? (
          <div className="flex items-center gap-3 px-2 py-2 group-data-[collapsible=icon]:justify-center">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarFallback className="bg-accent text-foreground">{wallet.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="text-sm truncate">{wallet.displayName}</p>
              <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                {t("wallet.connectedEcny")}
              </p>
            </div>
            <div className="flex gap-1 group-data-[collapsible=icon]:hidden">
              <button className="text-muted-foreground hover:text-foreground"><Settings className="w-4 h-4" /></button>
              <button className="text-muted-foreground hover:text-foreground"><Bell className="w-4 h-4" /></button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 px-2 py-2 group-data-[collapsible=icon]:justify-center">
            <div className="w-8 h-8 shrink-0 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-muted-foreground/50" />
            </div>
            <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="text-sm text-muted-foreground truncate">{t("wallet.notConnected")}</p>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
