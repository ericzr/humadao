import { useState, useMemo, useCallback } from "react";
import { MapPin, Search, ChevronRight, ChevronLeft, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { locationTree, searchLocations, getLocationPath } from "@/data/location";
import type { LocationNode } from "@/types/location";

interface LocationPickerProps {
  value: string | null; // null = global/all
  onChange: (locationId: string | null) => void;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [path, setPath] = useState<LocationNode[]>([]); // breadcrumb navigation stack

  const currentNodes = useMemo(() => {
    if (path.length === 0) return locationTree;
    const last = path[path.length - 1];
    return last.children ?? [];
  }, [path]);

  const searchResults = useMemo(() => {
    if (!search.trim()) return null;
    return searchLocations(locationTree, search.trim(), t).slice(0, 8);
  }, [search, t]);

  const handleSelect = useCallback(
    (id: string | null) => {
      onChange(id);
      setOpen(false);
      setSearch("");
      setPath([]);
    },
    [onChange],
  );

  const handleDrillDown = useCallback((node: LocationNode) => {
    setPath((prev) => [...prev, node]);
    setSearch("");
  }, []);

  const handleBack = useCallback((toIndex: number) => {
    setPath((prev) => prev.slice(0, toIndex));
  }, []);

  const displayLabel = useMemo(() => {
    if (!value) return null;
    return getLocationPath(value, locationTree, t);
  }, [value, t]);

  return (
    <Popover open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setSearch(""); setPath([]); } }}>
      <PopoverTrigger asChild>
        <button
          className={`relative flex items-center justify-center gap-1.5 h-9 rounded-md border transition text-xs px-2.5 ${
            value
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          {displayLabel && (
            <>
              <span className="max-w-[120px] truncate">{displayLabel}</span>
              <X
                className="w-3 h-3 opacity-60 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(null);
                }}
              />
            </>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-64 p-0" sideOffset={8}>
        {/* Search */}
        <div className="p-2 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder={t("location.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 pl-8 text-xs bg-transparent border-none shadow-none focus-visible:ring-0"
            />
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto">
          {/* Search results mode */}
          {searchResults ? (
            <div className="p-1">
              {searchResults.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">{t("location.noResults")}</p>
              ) : (
                searchResults.map(({ node, path: nodePath }) => (
                  <button
                    key={node.id}
                    onClick={() => handleSelect(node.id)}
                    className={`w-full flex flex-col items-start gap-0.5 px-3 py-2 rounded-md text-xs transition hover:bg-secondary ${
                      value === node.id ? "bg-primary/10 text-primary" : ""
                    }`}
                  >
                    <span>{t(node.labelKey)}</span>
                    {nodePath.length > 0 && (
                      <span className="text-[0.65rem] text-muted-foreground">
                        {nodePath.map((p) => t(p.labelKey)).join(" · ")}
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          ) : (
            /* Drill-down browse mode */
            <div className="p-1">
              {/* Breadcrumb */}
              {path.length > 0 && (
                <button
                  onClick={() => handleBack(path.length - 1)}
                  className="w-full flex items-center gap-1.5 px-3 py-2 rounded-md text-xs text-muted-foreground hover:bg-secondary transition mb-0.5"
                >
                  <ChevronLeft className="w-3 h-3" />
                  <span className="truncate">
                    {path.map((p) => t(p.labelKey)).join(" · ")}
                  </span>
                </button>
              )}

              {/* Global option at top level */}
              {path.length === 0 && (
                <button
                  onClick={() => handleSelect(null)}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-xs transition hover:bg-secondary ${
                    !value ? "bg-primary/10 text-primary font-medium" : ""
                  }`}
                >
                  🌐 {t("location.global")}
                </button>
              )}

              {/* "All of this region" option when drilled in */}
              {path.length > 0 && (
                <button
                  onClick={() => handleSelect(path[path.length - 1].id)}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-xs transition hover:bg-secondary ${
                    value === path[path.length - 1].id ? "bg-primary/10 text-primary font-medium" : ""
                  }`}
                >
                  {t("location.allOf", { name: t(path[path.length - 1].labelKey) })}
                </button>
              )}

              {/* Current level nodes */}
              {currentNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => (node.children ? handleDrillDown(node) : handleSelect(node.id))}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs transition hover:bg-secondary ${
                    value === node.id ? "bg-primary/10 text-primary font-medium" : ""
                  }`}
                >
                  <span>{t(node.labelKey)}</span>
                  {node.children && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
