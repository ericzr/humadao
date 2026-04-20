import { useState } from "react";
import { Send, Hash, Users, Award, Vote, Paperclip, AtSign, Search } from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { ScrollArea } from "../../ui/scroll-area";
import { useTranslation } from "react-i18next";

interface Message {
  user: string;
  textKey: string;
  time: string;
  avatar: string;
  ref?: { type: string; titleKey: string; amount?: string };
}

interface MessageAreaProps {
  activeChannelKey: string;
  messages: Message[];
}

export function MessageArea({ activeChannelKey, messages }: MessageAreaProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState("");

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <Hash className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="truncate">{t(activeChannelKey)}</span>
          <Badge className="bg-secondary text-muted-foreground border-0 text-[0.7rem] hidden sm:inline-flex">24 {t("chat.online")}</Badge>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="text-muted-foreground hover:text-foreground"><Users className="w-4 h-4" /></button>
          <button className="text-muted-foreground hover:text-foreground"><Search className="w-4 h-4" /></button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 sm:p-6">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className="flex gap-3">
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback className="bg-accent text-foreground text-[0.7rem]">{msg.avatar}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-foreground text-sm">{msg.user}</span>
                  <span className="text-muted-foreground text-[0.7rem]">{msg.time}</span>
                </div>
                <p className="text-foreground/80 text-sm">{t(msg.textKey)}</p>
                {msg.ref && (
                  <Card className="bg-accent/50 border-border p-3 mt-2 inline-flex items-center gap-2 cursor-pointer hover:border-foreground/20 transition">
                    {msg.ref.type === "bounty" ? (
                      <>
                        <Award className="w-4 h-4 text-muted-foreground shrink-0" />
                        <div>
                          <span className="text-xs">{t(msg.ref.titleKey)}</span>
                          {msg.ref.amount && <span className="text-muted-foreground ml-2 text-xs">{msg.ref.amount}</span>}
                        </div>
                      </>
                    ) : (
                      <>
                        <Vote className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="text-xs">{t(msg.ref.titleKey)}</span>
                      </>
                    )}
                  </Card>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-border p-3 sm:p-4">
        <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 sm:px-4 py-2">
          <button className="text-muted-foreground hover:text-foreground hidden sm:block"><Paperclip className="w-4 h-4" /></button>
          <button className="text-muted-foreground hover:text-foreground hidden sm:block"><AtSign className="w-4 h-4" /></button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`${t("chat.inputPlaceholder")} #${t(activeChannelKey)}...`}
            className="flex-1 bg-transparent outline-none text-foreground text-sm min-w-0"
          />
          <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 px-3 shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
