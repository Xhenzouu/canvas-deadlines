import { useState } from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readBoardView, persistBoardView } from "@/lib/board-view";
import { AssignmentTable } from "@/components/AssignmentTable";
import { KanbanBoard } from "@/components/KanbanBoard";
import { initialAssignments } from "@/data/mockData";
import { submissionStats, type SubmittedIds } from "@/lib/submissions";

afterEach(() => { cleanup(); vi.restoreAllMocks(); window.localStorage.clear(); });

describe("Board view", () => {
  it("defaults to Kanban for missing or invalid saved views", () => {
    expect(readBoardView()).toBe("kanban");
    window.localStorage.setItem("canvas-deadlines-view", "invalid");
    expect(readBoardView()).toBe("kanban");
  });
  it("remembers Table and Kanban using canvas-deadlines-view", () => {
    persistBoardView("table");
    expect(window.localStorage.getItem("canvas-deadlines-view")).toBe("table");
    expect(readBoardView()).toBe("table");
    persistBoardView("kanban");
    expect(readBoardView()).toBe("kanban");
  });
  it("handles unavailable storage without preventing view switching", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("unavailable"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("unavailable"); });
    expect(readBoardView()).toBe("kanban");
    expect(() => persistBoardView("table")).not.toThrow();
  });
  it("uses the same submission state and counts in both views", () => {
    let latest: SubmittedIds = {};
    function Harness() {
      const [ids, setIds] = useState<SubmittedIds>({});
      latest = ids;
      const props = { items: initialAssignments, submittedIds: ids, onSubmittedChange: (id: string, checked: boolean) => setIds((prev) => ({ ...prev, [id]: checked })) };
      return <><AssignmentTable {...props} /><KanbanBoard {...props} /></>;
    }
    const screen = render(<Harness />);
    const table = screen.getByRole("table");
    fireEvent.click(table.querySelectorAll('[role="checkbox"]')[0]);
    expect(latest.k1).toBe(true);
    expect(submissionStats(initialAssignments, latest)).toEqual({ submitted: 1, unsubmitted: 11, total: 12 });
    const rowTitles = Array.from(table.querySelectorAll("tbody tr"), (row) => row.children[2].textContent);
    expect(rowTitles.at(-1)).toBe("KC - Amazon Virtual Private Cloud [VPC]");
    expect(screen.getAllByRole("checkbox").filter((checkbox) => checkbox.getAttribute("data-state") === "checked")).toHaveLength(2);
    const checkedCard = screen.getAllByRole("checkbox").filter((checkbox) => checkbox.getAttribute("data-state") === "checked").at(-1);
    if (!checkedCard) throw new Error("Missing submitted card");
    fireEvent.click(checkedCard);
    expect(submissionStats(initialAssignments, latest)).toEqual({ submitted: 0, unsubmitted: 12, total: 12 });
    expect(table.querySelector("tbody tr")?.children[2].textContent).toBe("KC - Amazon Virtual Private Cloud [VPC]");
  });
});