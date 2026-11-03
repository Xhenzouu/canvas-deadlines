import { fireEvent, render, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { initialAssignments } from "@/data/mockData";
import { AssignmentCard } from "@/components/AssignmentCard";
import { persistSubmittedIds, readSubmittedIds, sortBySubmission, submissionStats, submittedStorageKey } from "@/lib/submissions";

afterEach(() => { cleanup(); vi.restoreAllMocks(); window.localStorage.clear(); });

describe("Submission tracking", () => {
  it("derives counts from the 12 board items, ignoring saved IDs absent from the board", () => {
    expect(submissionStats(initialAssignments, { a1: true, l1: true, missing: true })).toEqual({ unsubmitted: 10, submitted: 2, total: 12 });
    expect(submissionStats(initialAssignments, {})).toEqual({ unsubmitted: 12, submitted: 0, total: 12 });
  });

  it("keeps submitted items at the bottom of their own column", () => {
    const labs = initialAssignments.filter((item) => item.category === "Labs");
    const sorted = sortBySubmission(labs, { l1: true });
    expect(sorted.map((item) => item.id)).toEqual(["l2", "l3", "l4", "l1"]);
    expect(sorted.every((item) => item.category === "Labs")).toBe(true);
  });

  it("restores ascending due-date order on unchecking without mutating data", () => {
    const labs = initialAssignments.filter((item) => item.category === "Labs").reverse();
    expect(sortBySubmission(labs, {}).map((item) => item.id)).toEqual(["l1", "l2", "l3", "l4"]);
    expect(labs.map((item) => item.id)).toEqual(["l4", "l3", "l2", "l1"]);
  });

  it("persists and restores IDs using the required single storage key", () => {
    persistSubmittedIds({ a1: true });
    expect(window.localStorage.getItem("canvas-deadlines-submitted")).toBe('{"a1":true}');
    expect(readSubmittedIds()).toEqual({ a1: true });
  });

  it("recovers from malformed storage and excludes invalid submitted values", () => {
    window.localStorage.setItem(submittedStorageKey, "bad JSON");
    expect(readSubmittedIds()).toEqual({});
    window.localStorage.setItem(submittedStorageKey, '{"a1":true,"a2":false,"l1":"true"}');
    expect(readSubmittedIds()).toEqual({ a1: true });
  });

  it("remains usable when storage reads or writes throw", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("unavailable"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("unavailable"); });
    expect(readSubmittedIds()).toEqual({});
    expect(() => persistSubmittedIds({ a1: true })).not.toThrow();
  });

  it("toggles the item without triggering parent click or drag-start handlers", () => {
    const item = initialAssignments[0];
    if (!item) throw new Error("Missing fixture");
    const parentClick = vi.fn();
    const parentPointer = vi.fn();
    const change = vi.fn();
    const view = render(<div onClick={parentClick} onPointerDown={parentPointer}><AssignmentCard a={item} accent="bg-col-assign" submitted={false} onSubmittedChange={change} /></div>);
    const checkbox = view.getByRole("checkbox", { name: "Submitted" });
    fireEvent.pointerDown(checkbox);
    fireEvent.click(checkbox);
    expect(change).toHaveBeenCalledWith("a1", true);
    expect(parentClick).not.toHaveBeenCalled();
    expect(parentPointer).not.toHaveBeenCalled();
  });
});