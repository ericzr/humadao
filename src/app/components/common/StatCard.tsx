import type { LucideIcon } from "lucide-react";
import { Card } from "../ui/card";

interface StatCardProps {
  label: string;
  value: string;
  icon?: LucideIcon;
}

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <Card className="bg-card border-border p-3 sm:p-4 text-center">
      {Icon && <Icon className="w-5 h-5 text-muted-foreground mx-auto mb-1" />}
      <p className="text-2xl">{value}</p>
      <p className="text-muted-foreground text-xs">{label}</p>
    </Card>
  );
}
