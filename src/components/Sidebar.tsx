import { ChevronLeft, ChevronRight, LayoutGrid, Settings, CalendarClock } from "lucide-react";

export function Sidebar({
  collapsed,
  onToggle,
  active,
  onNavigate,
}: {
  collapsed: boolean;
  onToggle: () => void;
  active: string;
  onNavigate: (v: string) => void;
}) {
  const links = [
    { id: "board", label: "Board", icon: LayoutGrid },
    { id: "settings", label: "Settings", icon: Settings },
  ];
  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 ${
        collapsed ? "w-16" : "w-[260px]"
      }`}
    >
      <div className={`flex gap-2 border-b border-sidebar-border p-4 ${collapsed ? "flex-col items-center" : "items-center justify-between"}`}>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <CalendarClock className="h-4 w-4" />
          </div>
          {!collapsed && <span className="font-serif text-lg">Deadlines</span>}
        </div>
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {links.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            title={label}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${collapsed ? "justify-center" : ""} ${
              active === id
                ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/60"
            }`}
          >
            <Icon className="h-4 w-4" />
            {!collapsed && label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
