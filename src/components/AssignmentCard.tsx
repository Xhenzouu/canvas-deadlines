import { motion } from "framer-motion";
import type { Assignment } from "@/data/mockData";

export function AssignmentCard({ a, accent }: { a: Assignment; accent: string }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-md border border-border bg-card p-4"
    >
      <p className="text-xs text-muted-foreground">{a.course}</p>
      <h3 className="mt-1 text-sm font-semibold leading-snug text-card-foreground">{a.title}</h3>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <span className={`h-2 w-2 rounded-full ${accent}`} />
          {a.category}
        </span>
        <span className="tabular-nums text-muted-foreground">Due {a.due}</span>
      </div>
    </motion.div>
  );
}
