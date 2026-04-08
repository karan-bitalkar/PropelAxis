import { useState } from "react";
import { Plus, Pencil, Trash2, Search, CheckCircle, Clock, Circle, Calendar } from "lucide-react";
import { MOCK_TASKS } from "@/constants";
import { getPriorityColor } from "@/lib/utils";
import type { Task } from "@/types";
import DeleteModal from "@/components/modals/DeleteModal";
import { toast } from "sonner";

function CreateTaskModal({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (t: Partial<Task>) => void }) {
  const [form, setForm] = useState({ title: "", priority: "medium" as Task["priority"], dueDate: "", status: "todo" as Task["status"] });
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-display font-bold text-slate-900">Create Task</h2>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(form); setForm({ title: "", priority: "medium", dueDate: "", status: "todo" }); onClose(); }} className="p-6 space-y-4">
          <div>
            <label className="label">Task Title *</label>
            <input className="input-field" placeholder="e.g., Complete project review" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Priority</label>
              <select className="input-field" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as Task["priority"] })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="label">Due Date</label>
              <input type="date" className="input-field" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm">Cancel</button>
            <button type="submit" className="flex-1 btn-primary text-sm py-3">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | Task["status"]>("all");
  const [showCreate, setShowCreate] = useState(false);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);

  const filtered = tasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || t.status === filter;
    return matchSearch && matchFilter;
  });

  const byStatus = {
    todo: filtered.filter((t) => t.status === "todo"),
    "in-progress": filtered.filter((t) => t.status === "in-progress"),
    completed: filtered.filter((t) => t.status === "completed"),
  };

  function handleCreate(data: Partial<Task>) {
    const t: Task = { id: Date.now().toString(), title: data.title || "", status: "todo", priority: data.priority || "medium", dueDate: data.dueDate || "", createdAt: new Date().toISOString() };
    setTasks([t, ...tasks]);
    toast.success("Task created!");
  }

  function cycleStatus(task: Task) {
    const next: Record<Task["status"], Task["status"]> = { "todo": "in-progress", "in-progress": "completed", "completed": "todo" };
    setTasks(tasks.map((t) => t.id === task.id ? { ...t, status: next[t.status] } : t));
    toast.success(`Task marked as ${next[task.status].replace("-", " ")}`);
  }

  function handleDelete() {
    if (!deleteTask) return;
    setTasks(tasks.filter((t) => t.id !== deleteTask.id));
    toast.success("Task deleted.");
    setDeleteTask(null);
  }

  const statusIcon = (s: Task["status"]) => {
    if (s === "completed") return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    if (s === "in-progress") return <Clock className="w-4 h-4 text-indigo-500" />;
    return <Circle className="w-4 h-4 text-slate-300" />;
  };

  const statusColor = { "todo": "bg-slate-100", "in-progress": "bg-indigo-50 border-indigo-100", "completed": "bg-emerald-50 border-emerald-100" };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900">Task Management</h2>
          <p className="text-slate-500 text-sm">{tasks.length} tasks — {byStatus["in-progress"].length} in progress</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2 text-sm py-2.5">
          <Plus className="w-4 h-4" /> New Task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "To Do", count: tasks.filter((t) => t.status === "todo").length, color: "text-slate-600" },
          { label: "In Progress", count: tasks.filter((t) => t.status === "in-progress").length, color: "text-violet-600" },
          { label: "Completed", count: tasks.filter((t) => t.status === "completed").length, color: "text-emerald-600" },
        ].map((s) => (
          <div key={s.label} className="stat-card text-center">
            <p className={`text-2xl font-display font-bold ${s.color}`}>{s.count}</p>
            <p className="text-slate-500 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input className="input-field pl-9" placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {["all", "todo", "in-progress", "completed"].map((s) => (
            <button key={s} onClick={() => setFilter(s as typeof filter)} className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all capitalize ${filter === s ? "bg-gradient-to-r from-green-600 to-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-green-300"}`}>
              {s === "all" ? "All" : s.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban */}
      <div className="grid md:grid-cols-3 gap-6">
        {(["todo", "in-progress", "completed"] as Task["status"][]).map((col) => (
          <div key={col}>
            <div className="flex items-center gap-2 mb-3">
              {statusIcon(col)}
              <h3 className="font-semibold text-slate-700 text-sm capitalize">{col.replace("-", " ")}</h3>
              <span className="ml-auto w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-xs text-slate-500 font-medium">{byStatus[col].length}</span>
            </div>
            <div className="space-y-3">
              {byStatus[col].map((task) => (
                <div key={task.id} className={`rounded-xl p-4 border ${statusColor[task.status]} cursor-pointer hover:shadow-sm transition-all group`} onClick={() => cycleStatus(task)}>
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-medium leading-tight ${task.status === "completed" ? "line-through text-slate-400" : "text-slate-800"}`}>{task.title}</p>
                    <button onClick={(e) => { e.stopPropagation(); setDeleteTask(task); }} className="p-1 rounded-lg hover:bg-red-100 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                    {task.dueDate && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{task.dueDate}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <CreateTaskModal isOpen={showCreate} onClose={() => setShowCreate(false)} onSave={handleCreate} />
      <DeleteModal isOpen={!!deleteTask} title="Delete Task" message={`Delete "${deleteTask?.title}"?`} onClose={() => setDeleteTask(null)} onConfirm={handleDelete} />
    </div>
  );
}
