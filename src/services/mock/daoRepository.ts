import { myDAOs, townHallDAOs } from "@/data";
import type { DAO, DAOBrief } from "@/types";

export interface DAOCluster {
  id: string;
  titleKey: string;
  descKey: string;
  daoIds: string[];
}

const clusters: DAOCluster[] = [
  {
    id: "humanMachine",
    titleKey: "home.cluster.humanMachine",
    descKey: "home.cluster.humanMachineDesc",
    daoIds: ["luboom-reactor", "agent-market", "agent-farm", "protocol-crowdsourcing"],
  },
  {
    id: "publicInfra",
    titleKey: "home.cluster.publicInfra",
    descKey: "home.cluster.publicInfraDesc",
    daoIds: ["trusted-food", "city-energy-station"],
  },
  {
    id: "careLiving",
    titleKey: "home.cluster.careLiving",
    descKey: "home.cluster.careLivingDesc",
    daoIds: ["community-eldercare", "free-living"],
  },
  {
    id: "educationCulture",
    titleKey: "home.cluster.educationCulture",
    descKey: "home.cluster.educationCultureDesc",
    daoIds: ["open-university", "visual-books"],
  },
  {
    id: "lifestyleHealing",
    titleKey: "home.cluster.lifestyleHealing",
    descKey: "home.cluster.lifestyleHealingDesc",
    daoIds: ["healing-jewelry"],
  },
];

export function listDAOs(): DAO[] {
  return townHallDAOs;
}

export function listFeaturedDAOs(limit = 3): DAO[] {
  return [...townHallDAOs]
    .filter((dao) => dao.featured)
    .sort((a, b) => b.members - a.members)
    .slice(0, limit);
}

export function listWorkspaceDAOs(limit = 6): DAOBrief[] {
  return myDAOs.slice(0, limit);
}

export function getDAOById(id: string): DAO | undefined {
  return townHallDAOs.find((dao) => dao.id === id);
}

export function listDAOClusters(): Array<DAOCluster & { daos: DAO[] }> {
  return clusters.map((cluster) => ({
    ...cluster,
    daos: cluster.daoIds
      .map((id) => getDAOById(id))
      .filter((dao): dao is DAO => Boolean(dao)),
  }));
}

export function countShowcaseStats() {
  const all = listDAOs();
  const active = all.filter((dao) => dao.lifecycle === "active").length;
  const incubating = all.filter((dao) => dao.lifecycle === "incubating").length;
  const offlineCapable = all.filter((dao) => dao.mode === "offline" || dao.mode === "hybrid").length;
  const totalMembers = all.reduce((sum, dao) => sum + dao.members, 0);

  return {
    totalProjects: all.length,
    activeProjects: active,
    incubatingProjects: incubating,
    offlineCapable,
    totalMembers,
  };
}
