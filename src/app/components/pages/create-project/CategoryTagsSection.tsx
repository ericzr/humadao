import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Input } from "../../ui/input";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useTranslation } from "react-i18next";
import type { CreateDAOFormData } from "../CreateProjectPage";

const categories = [
  "create.cat.defi",
  "create.cat.infra",
  "create.cat.social",
  "create.cat.game",
  "create.cat.governance",
  "create.cat.education",
  "create.cat.tools",
] as const;

interface Props {
  form?: CreateDAOFormData;
  update?: (patch: Partial<CreateDAOFormData>) => void;
}

export function CategoryTagsSection({ form, update }: Props) {
  const { t } = useTranslation();
  const tags = form?.tags ?? [];
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      update?.({ tags: [...tags, tagInput] });
      setTagInput("");
    }
  };

  const removeTag = (tg: string) => {
    update?.({ tags: tags.filter((x) => x !== tg) });
  };

  return (
    <Card className="bg-card border-border p-4 sm:p-6 space-y-4">
      <h2>{t("create.categoryAndTags")}</h2>
      <div>
        <label className="text-muted-foreground mb-1 block text-sm">{t("create.category")}</label>
        <Select
          value={form?.categories?.[0] ?? ""}
          onValueChange={(v) => update?.({ categories: [v] })}
        >
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue placeholder={t("create.categoryPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{t(c)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-muted-foreground mb-1 block text-sm">{t("create.tags")}</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tg) => (
            <Badge key={tg} className="bg-accent text-foreground border-0 flex items-center gap-1">
              {tg}
              <button onClick={() => removeTag(tg)}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTag()}
            placeholder={t("create.addTag")}
            className="bg-secondary border-border"
          />
          <Button variant="outline" onClick={addTag} className="border-border">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
