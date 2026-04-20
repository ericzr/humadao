import { useState } from "react";
import { Link } from "react-router";
import { Bookmark, ExternalLink, Trash2, Search } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";

type BookmarkType = "dao" | "bounty" | "proposal";

interface BookmarkItem {
  id: string;
  titleKey: string;
  descKey: string;
  type: BookmarkType;
  link: string;
  dao?: string;
  savedTimeKey: string;
}

const initialBookmarks: BookmarkItem[] = [
  { id: "b1", titleKey: "bookmarks.item.peaq", descKey: "bookmarks.item.peaqDesc", type: "dao", link: "/dao/peaq", savedTimeKey: "bookmarks.time.3d" },
  { id: "b2", titleKey: "bookmarks.item.frontendBounty", descKey: "bookmarks.item.frontendBountyDesc", type: "bounty", link: "/bounties/frontend-ui", dao: "peaq", savedTimeKey: "bookmarks.time.1d" },
  { id: "b3", titleKey: "bookmarks.item.treasuryProposal", descKey: "bookmarks.item.treasuryProposalDesc", type: "proposal", link: "/governance", dao: "peaq", savedTimeKey: "bookmarks.time.5d" },
  { id: "b4", titleKey: "bookmarks.item.gitcoin", descKey: "bookmarks.item.gitcoinDesc", type: "dao", link: "/dao/gitcoin", savedTimeKey: "bookmarks.time.1w" },
  { id: "b5", titleKey: "bookmarks.item.smartContractBounty", descKey: "bookmarks.item.smartContractBountyDesc", type: "bounty", link: "/bounties", dao: "peaq", savedTimeKey: "bookmarks.time.2d" },
];

const typeColor: Record<BookmarkType, string> = {
  dao: "bg-blue-500/10 text-blue-400",
  bounty: "bg-green-500/10 text-green-400",
  proposal: "bg-purple-500/10 text-purple-400",
};

export function BookmarksPage() {
  const { t } = useTranslation();
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<BookmarkType | "all">("all");

  const filtered = bookmarks.filter((b) => {
    const matchSearch = !search || t(b.titleKey).toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || b.type === filterType;
    return matchSearch && matchType;
  });

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-2">
        <Bookmark className="w-6 h-6" />
        <h1 className="text-xl font-semibold">{t("bookmarks.title")}</h1>
      </div>
      <p className="text-muted-foreground mb-6">{t("bookmarks.subtitle")}</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t("bookmarks.searchPlaceholder")}
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "dao", "bounty", "proposal"] as const).map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType(type)}
            >
              {t(`bookmarks.filter.${type}`)}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="p-8 text-center">
          <Bookmark className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground">{t("bookmarks.empty")}</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => (
            <Card key={b.id} className="p-4 hover:ring-1 hover:ring-foreground/10 transition group">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`${typeColor[b.type]} border-0 text-[0.65rem]`}>{t(`bookmarks.type.${b.type}`)}</Badge>
                    {b.dao && <span className="text-muted-foreground text-xs">{b.dao}</span>}
                    <span className="text-muted-foreground text-xs ml-auto hidden sm:inline">{t(b.savedTimeKey)}</span>
                  </div>
                  <Link to={b.link} className="text-sm font-medium hover:underline flex items-center gap-1">
                    {t(b.titleKey)} <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </Link>
                  <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{t(b.descKey)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition text-muted-foreground hover:text-destructive"
                  onClick={() => removeBookmark(b.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
