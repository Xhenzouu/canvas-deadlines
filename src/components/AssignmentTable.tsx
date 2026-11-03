import type { Assignment } from "@/data/mockData";
import { Checkbox } from "@/components/ui/checkbox";
import { sortBySubmission, type SubmittedIds } from "@/lib/submissions";

export function AssignmentTable({ items, submittedIds, onSubmittedChange }: {
  items: Assignment[];
  submittedIds: SubmittedIds;
  onSubmittedChange: (id: string, submitted: boolean) => void;
}) {
  return (
    <div className="overflow-x-auto border border-border bg-card">
      <table aria-label="Assignments" className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-border bg-muted/40">
          <tr>
            {["Submitted", "Course", "Assignment", "Category", "Due Date"].map((label) => (
              <th key={label} scope="col" className="px-4 py-3 font-semibold">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortBySubmission(items, submittedIds).map((item) => {
            const submitted = submittedIds[item.id] === true;
            return (
              <tr key={item.id} className={`border-b border-border last:border-b-0${submitted ? " text-muted-foreground" : " text-card-foreground"}`}>
                <td className="px-4 py-3">
                  <Checkbox
                    aria-label="Submitted"
                    checked={submitted}
                    onCheckedChange={(checked) => onSubmittedChange(item.id, checked === true)}
                    onClick={(event) => event.stopPropagation()}
                    onPointerDown={(event) => event.stopPropagation()}
                    onKeyDown={(event) => event.stopPropagation()}
                  />
                </td>
                <td className="px-4 py-3">{item.course}</td>
                <td className={`px-4 py-3${submitted ? " line-through" : ""}`}>{item.title}</td>
                <td className="px-4 py-3">{item.category}</td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums">{item.due}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}