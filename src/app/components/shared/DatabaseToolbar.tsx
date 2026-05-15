import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "../ui/utils";

interface DatabaseToolbarProps<T extends string> {
  filters: T[];
  activeFilter: T;
  getFilterLabel: (filter: T) => string;
  onFilterChange: (filter: T) => void;
  query: string;
  onQueryChange: (query: string) => void;
  searchPlaceholder: string;
  className?: string;
  searchClassName?: string;
  topRight?: React.ReactNode;
  children?: React.ReactNode;
}

export function DatabaseToolbar<T extends string>({
  filters,
  activeFilter,
  getFilterLabel,
  onFilterChange,
  query,
  onQueryChange,
  searchPlaceholder,
  className,
  searchClassName,
  topRight,
  children,
}: DatabaseToolbarProps<T>) {
  const hasControls = Boolean(children);

  return (
    <div className={cn("space-y-3 border-b border-border p-3", className)}>
      <div className="flex min-w-0 items-center justify-between gap-3">
        <div className="flex min-w-0 gap-1 overflow-x-auto scrollbar-none">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => onFilterChange(filter)}
              className={cn(
                "h-8 shrink-0 rounded-md px-3 text-sm transition",
                activeFilter === filter
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
              )}
            >
              {getFilterLabel(filter)}
            </button>
          ))}
        </div>
        {topRight && <div className="shrink-0">{topRight}</div>}
      </div>

      <div
        className={cn(
          "min-w-0 items-center gap-2",
          hasControls ? "grid grid-cols-[auto_minmax(0,1fr)]" : "flex justify-end",
        )}
      >
        {children && <div className="min-w-0">{children}</div>}
        <div className={cn("relative min-w-0", searchClassName ?? "w-full sm:w-[260px]")}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-8 border-0 bg-secondary/60 pl-9"
          />
        </div>
      </div>
    </div>
  );
}
