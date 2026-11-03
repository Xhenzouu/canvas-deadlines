import type { Assignment, Category } from "@/data/mockData";
import { KanbanColumn } from "./KanbanColumn";

const columns: Category[] = ["Assignments", "Labs", "Knowledge Checks"];

export function KanbanBoard({ items }: { items: Assignment[] }) {
  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
      {columns.map((c) => (
        <KanbanColumn key={c} title={c} items={items.filter((i) => i.category === c)} />
      ))}
    </div>
  );
}
