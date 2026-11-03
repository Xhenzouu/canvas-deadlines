import { motion } from "framer-motion";
import type { Assignment } from "@/data/mockData";
import { Checkbox } from "@/components/ui/checkbox";

export function AssignmentCard({ a, accent, submitted, onSubmittedChange }: {
  a: Assignment;
  accent: string;
  submitted: boolean;
  onSubmittedChange: (id: string, submitted: boolean) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: submitted ? 0.6 : 1, x: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative rounded-md border border-border bg-card p-4"
    >
      <Checkbox
        aria-label="Submitted"
        className="absolute right-4 top-4"
        checked={submitted}
        onCheckedChange={(checked) => onSubmittedChange(a.id, checked === true)}
        onClick={(event) => event.stopPropagation()}
        onPointerDown={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      />
      <p className="pr-6 text-xs text-muted-foreground">{a.course}</p>
      <h3 className={`mt-1 text-sm font-semibold leading-snug text-card-foreground${submitted ? " line-through" : ""}`}>{a.title}</h3>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <span className={`h-2 w-2 rounded-full ${accent}`} />
          {a.category}
        </span>
        {submitted ? (
          <span className="rounded bg-submitted/15 px-1.5 text-submitted">Submitted</span>
        ) : (
          <span className="tabular-nums text-muted-foreground">Due {a.due}</span>
        )}
      </div>
    </motion.div>
  );
}
