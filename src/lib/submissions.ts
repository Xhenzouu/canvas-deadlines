import type { Assignment } from "@/data/mockData";

export type SubmittedIds = Record<string, boolean>;
export const submittedStorageKey = "canvas-deadlines-submitted";

export function readSubmittedIds(): SubmittedIds {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(submittedStorageKey) ?? "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(Object.entries(parsed).filter(([, value]) => value === true));
  } catch {
    return {};
  }
}

export function persistSubmittedIds(ids: SubmittedIds) {
  try {
    window.localStorage.setItem(submittedStorageKey, JSON.stringify(ids));
  } catch {
    // Submission tracking remains usable when browser storage is unavailable.
  }
}

export function submissionStats(items: Assignment[], ids: SubmittedIds) {
  const assignments = items.map((item) => ({ ...item, submitted: ids[item.id] === true }));
  const unsubmitted = assignments.filter((item) => item.submitted === false).length;
  return { unsubmitted, submitted: assignments.length - unsubmitted, total: assignments.length };
}

export function sortBySubmission(items: Assignment[], ids: SubmittedIds) {
  return [...items].sort((a, b) =>
    Number(ids[a.id] === true) - Number(ids[b.id] === true) || a.due.localeCompare(b.due),
  );
}