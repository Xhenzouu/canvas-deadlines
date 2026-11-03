import { AnimatePresence } from "framer-motion";
import type { Assignment, Category } from "@/data/mockData";
import { AssignmentCard } from "./AssignmentCard";

const accents: Record<Category, string> = {
  Assignments: "bg-col-assign",
  Labs: "bg-col-lab",
  "Knowledge Checks": "bg-col-kc",
};

export function KanbanColumn({ title, items }: { title: Category; items: Assignment[] }) {
  const accent = accents[title];
  const headerBg = title === "Knowledge Checks" ? "bg-kc-tint" : "bg-card";
  return (
    <section className="flex flex-col rounded-lg border border-border bg-muted/40">
      <header className={`flex items-center justify-between rounded-t-lg border-b border-border px-4 py-3 ${headerBg}`}>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-1 rounded-sm ${accent}`} />
          <h2 className="text-sm font-semibold">{title}</h2>
        </div>
        <span className="rounded bg-secondary px-2 py-0.5 text-xs tabular-nums text-muted-foreground">
          {items.length}
        </span>
      </header>
      <div className="flex flex-col gap-3 p-3">
        <AnimatePresence initial={false}>
          {items.map((a) => (
            <AssignmentCard key={a.id} a={a} accent={accent} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
