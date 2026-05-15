import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";

interface DiscussionMessage {
  user: string;
  time: string;
  text: string;
}

interface DiscussionThreadProps {
  title: string;
  messages: DiscussionMessage[];
  placeholder: string;
}

function initials(name: string) {
  return name.slice(0, 1).toUpperCase();
}

export function DiscussionThread({ title, messages, placeholder }: DiscussionThreadProps) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState("");
  const [localMessages, setLocalMessages] = useState<DiscussionMessage[]>([]);
  const allMessages = [...messages, ...localMessages];

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setLocalMessages((current) => [
      ...current,
      {
        user: t("discussion.me"),
        time: t("discussion.justNow"),
        text,
      },
    ]);
    setDraft("");
  };

  return (
    <Card className="border-border bg-card p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <MessageCircle className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-base font-medium">{title}</h2>
        <Badge variant="secondary" className="h-5 rounded-md text-[0.65rem]">
          {allMessages.length}
        </Badge>
      </div>

      <div className="space-y-3">
        {allMessages.map((message, index) => (
          <div key={`${message.user}-${message.time}-${index}`} className="flex gap-3 rounded-lg bg-secondary/60 p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background text-xs font-medium">
              {initials(message.user)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">{message.user}</span>
                <span className="text-xs text-muted-foreground">{message.time}</span>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">{message.text}</p>
            </div>
          </div>
        ))}

        <div className="flex gap-3 border-t border-border pt-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background">
            {initials(t("discussion.me"))}
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <Textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={placeholder}
              className="min-h-20 resize-none"
            />
            <div className="flex justify-end">
              <Button size="sm" disabled={!draft.trim()} onClick={send}>
                <Send className="h-4 w-4" />
                {t("discussion.send")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
