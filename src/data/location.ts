import type { LocationNode } from "@/types/location";

export const locationTree: LocationNode[] = [
  {
    id: "asia",
    labelKey: "location.asia",
    children: [
      {
        id: "cn",
        labelKey: "location.cn",
        children: [
          { id: "cn-beijing", labelKey: "location.cn-beijing" },
          { id: "cn-shanghai", labelKey: "location.cn-shanghai" },
          { id: "cn-guangzhou", labelKey: "location.cn-guangzhou" },
          { id: "cn-shenzhen", labelKey: "location.cn-shenzhen" },
          { id: "cn-hangzhou", labelKey: "location.cn-hangzhou" },
          { id: "cn-chengdu", labelKey: "location.cn-chengdu" },
          { id: "cn-nanjing", labelKey: "location.cn-nanjing" },
          { id: "cn-suzhou", labelKey: "location.cn-suzhou" },
          {
            id: "cn-ordos",
            labelKey: "location.cn-ordos",
            children: [
              { id: "cn-ordos-dongsheng", labelKey: "location.cn-ordos-dongsheng" },
              { id: "cn-ordos-kangbashi", labelKey: "location.cn-ordos-kangbashi" },
            ],
          },
        ],
      },
      {
        id: "jp",
        labelKey: "location.jp",
        children: [
          { id: "jp-tokyo", labelKey: "location.jp-tokyo" },
        ],
      },
      {
        id: "in",
        labelKey: "location.in",
        children: [
          { id: "in-bangalore", labelKey: "location.in-bangalore" },
        ],
      },
      { id: "sea", labelKey: "location.sea" },
      { id: "kr", labelKey: "location.kr" },
    ],
  },
  {
    id: "europe",
    labelKey: "location.europe",
    children: [
      {
        id: "de",
        labelKey: "location.de",
        children: [
          { id: "de-berlin", labelKey: "location.de-berlin" },
        ],
      },
      { id: "fr", labelKey: "location.fr" },
      { id: "uk", labelKey: "location.uk" },
      { id: "nl", labelKey: "location.nl" },
    ],
  },
  {
    id: "northAmerica",
    labelKey: "location.northAmerica",
    children: [
      { id: "us", labelKey: "location.us" },
      { id: "ca", labelKey: "location.ca" },
    ],
  },
  {
    id: "southAmerica",
    labelKey: "location.southAmerica",
  },
  {
    id: "africa",
    labelKey: "location.africa",
    children: [
      {
        id: "ng",
        labelKey: "location.ng",
        children: [
          { id: "ng-lagos", labelKey: "location.ng-lagos" },
        ],
      },
    ],
  },
  {
    id: "middleEast",
    labelKey: "location.middleEast",
  },
  {
    id: "oceania",
    labelKey: "location.oceania",
  },
];

/** Check if a locationId is a descendant of (or equal to) an ancestor node */
export function isLocationMatch(locationId: string | undefined, selectedId: string): boolean {
  if (!locationId) return false;
  if (selectedId === "global") return true;
  if (locationId === selectedId) return true;
  // Check if locationId starts with selectedId (e.g., "cn-shanghai" starts with "cn", "cn-ordos-dongsheng" starts with "cn-ordos")
  return locationId.startsWith(selectedId + "-") || locationId.startsWith(selectedId + "/");
}

/** Recursively search all nodes for matching label */
export function searchLocations(
  nodes: LocationNode[],
  query: string,
  t: (key: string) => string,
  path: LocationNode[] = [],
): Array<{ node: LocationNode; path: LocationNode[] }> {
  const results: Array<{ node: LocationNode; path: LocationNode[] }> = [];
  for (const node of nodes) {
    const label = t(node.labelKey).toLowerCase();
    if (label.includes(query.toLowerCase())) {
      results.push({ node, path: [...path] });
    }
    if (node.children) {
      results.push(...searchLocations(node.children, query, t, [...path, node]));
    }
  }
  return results;
}

/** Get the display path for a locationId */
export function getLocationPath(
  locationId: string,
  nodes: LocationNode[],
  t: (key: string) => string,
  path: string[] = [],
): string | null {
  for (const node of nodes) {
    if (node.id === locationId) {
      return [...path, t(node.labelKey)].join(" · ");
    }
    if (node.children) {
      const result = getLocationPath(locationId, node.children, t, [...path, t(node.labelKey)]);
      if (result) return result;
    }
  }
  return null;
}
