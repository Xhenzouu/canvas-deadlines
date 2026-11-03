export type BoardView = "kanban" | "table";
export const boardViewStorageKey = "canvas-deadlines-view";

export function readBoardView(): BoardView {
  try {
    return window.localStorage.getItem(boardViewStorageKey) === "table" ? "table" : "kanban";
  } catch {
    return "kanban";
  }
}

export function persistBoardView(view: BoardView) {
  try {
    window.localStorage.setItem(boardViewStorageKey, view);
  } catch {
    // View switching still works when browser storage is unavailable.
  }
}