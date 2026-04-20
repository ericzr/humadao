import { FileText, ExternalLink } from "lucide-react";
import { Card } from "../../ui/card";
import { useTranslation } from "react-i18next";

const docs = [
  "dao.doc.whitepaper" as const,
  "dao.doc.techDocs" as const,
  "dao.doc.roadmap" as const,
  "dao.doc.guide" as const,
];

export function DAODocuments() {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="mb-4">{t("dao.documents")}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {docs.map((doc) => (
          <Card key={doc} className="bg-card border-border p-4 hover:border-foreground/20 transition cursor-pointer flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="w-5 h-5 text-muted-foreground shrink-0" />
              <span className="truncate">{t(doc)}</span>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
          </Card>
        ))}
      </div>
    </>
  );
}
