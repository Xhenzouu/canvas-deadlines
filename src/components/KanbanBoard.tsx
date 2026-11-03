import type { Assignment, Category } from "@/data/mockData";
import { KanbanColumn } from "./KanbanColumn";
import type { SubmittedIds } from "@/lib/submissions";

const columns: Category[] = ["Assignments", "Labs", "Knowledge Checks"];

export function KanbanBoard({ items, submittedIds, onSubmittedChange }: {
  items: Assignment[];
  submittedIds: SubmittedIds;
  onSubmittedChange: (id: string, submitted: boolean) => void;
}) {
  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
      {columns.map((c) => (
        <KanbanColumn key={c} title={c} items={items.filter((i) => i.category === c)} submittedIds={submittedIds} onSubmittedChange={onSubmittedChange} />
      ))}
    </div>
  );
}
