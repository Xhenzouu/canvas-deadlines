import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Moon, RefreshCw, Sun } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { KanbanBoard } from "@/components/KanbanBoard";
import { auditRow, initialAssignments, makeSyncedAssignment } from "@/data/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Canvas Deadlines — Kanban Board" },
      { name: "description", content: "Canvas LMS assignments, labs and knowledge checks organized on one Kanban board." },
      { property: "og:title", content: "Canvas Deadlines — Kanban Board" },
      { property: "og:description", content: "Canvas LMS assignments, labs and knowledge checks organized on one Kanban board." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Kpi({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function Index() {
  const [dark, setDark] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [nav, setNav] = useState("board");
  const [items, setItems] = useState(initialAssignments);
  const [total, setTotal] = useState(auditRow.total_assignments_scanned);
  const [unsubmitted, setUnsubmitted] = useState(auditRow.unsubmitted_count);
  const [lastSynced, setLastSynced] = useState(auditRow.last_synced);
  const [syncing, setSyncing] = useState(false);
  const [syncCount, setSyncCount] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const sync = () => {
    setSyncing(true);
    setTimeout(() => {
      setItems((prev) => [...prev, makeSyncedAssignment(syncCount)]);
      setSyncCount((n) => n + 1);
      setTotal((t) => t + 1);
      setUnsubmitted((u) => u + 1);
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setLastSynced(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`);
      setSyncing(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} active={nav} onNavigate={setNav} />
      <main className="flex-1 px-8 py-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl">Canvas Deadlines</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {auditRow.course_count} course · {items.length} on board
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={sync}
              disabled={syncing}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-80"
            >
              {syncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              {syncing ? "Syncing…" : "Sync Canvas"}
            </button>
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="rounded-md border border-border bg-card p-2 hover:bg-accent"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </header>

        {nav === "board" ? (
          <>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Kpi label="Total Assignments" value={total} />
              <Kpi label="Unsubmitted" value={unsubmitted} />
              <Kpi label="Last Synced" value={lastSynced} />
            </div>
            <div className="mt-6">
              <KanbanBoard items={items} />
            </div>
          </>
        ) : (
          <div className="mt-6 rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
            Settings are not available in this demo.
          </div>
        )}
      </main>
    </div>
  );
}
