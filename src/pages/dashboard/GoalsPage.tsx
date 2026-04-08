import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Flag, Calendar, ChevronRight } from "lucide-react";
import { MOCK_GOALS } from "@/constants";
import { formatDate, getStatusColor, getPriorityColor } from "@/lib/utils";
import type { Goal } from "@/types";
import CreateGoalModal from "@/components/modals/CreateGoalModal";
import EditGoalModal from "@/components/modals/EditGoalModal";
import DeleteModal from "@/components/modals/DeleteModal";
import GoalDetailSlideOver from "@/components/modals/GoalDetailSlideOver";
import { toast } from "sonner";

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(MOCK_GOALS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [editGoal, setEditGoal] = useState<Goal | null>(null);
  const [deleteGoal, setDeleteGoal] = useState<Goal | null>(null);
  const [detailGoal, setDetailGoal] = useState<Goal | null>(null);

  const filtered = goals.filter((g) => {
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase()) || g.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || g.status === filterStatus;
    return matchSearch && matchStatus;
  });

  function handleCreate(data: Partial<Goal>) {
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: data.title || "",
      description: data.description || "",
      category: data.category || "General",
      status: "active",
      progress: 0,
      deadline: data.deadline || "",
      createdAt: new Date().toISOString(),
      ownerId: "user1",
      priority: data.priority || "medium",
    };
    setGoals([newGoal, ...goals]);
    toast.success("Goal created successfully!");
  }

  function handleEdit(updated: Goal) {
    setGoals(goals.map((g) => g.id === updated.id ? updated : g));
    toast.success("Goal updated successfully!");
  }

  function handleDelete() {
    if (!deleteGoal) return;
    setGoals(goals.filter((g) => g.id !== deleteGoal.id));
    toast.success("Goal deleted.");
    setDeleteGoal(null);
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900">Goal Management</h2>
          <p className="text-slate-500 text-sm">{goals.length} total goals — {goals.filter((g) => g.status === "active").length} active</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2 text-sm py-2.5">
          <Plus className="w-4 h-4" />
          New Goal
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            className="input-field pl-9"
            placeholder="Search goals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["all", "active", "completed", "at-risk", "paused"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all capitalize ${filterStatus === s ? "bg-gradient-to-r from-green-600 to-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-green-300"}`}
            >
              {s === "all" ? "All" : s.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Goal Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Goals", value: goals.length, color: "text-green-600" },
          { label: "Active", value: goals.filter((g) => g.status === "active").length, color: "text-green-600" },
          { label: "Completed", value: goals.filter((g) => g.status === "completed").length, color: "text-emerald-600" },
          { label: "At Risk", value: goals.filter((g) => g.status === "at-risk").length, color: "text-red-600" },
        ].map((stat) => (
          <div key={stat.label} className="stat-card text-center">
            <p className={`text-3xl font-display font-bold mb-1 ${stat.color}`}>{stat.value}</p>
            <p className="text-slate-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Goals Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((goal) => (
          <div
            key={goal.id}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all group cursor-pointer"
            onClick={() => setDetailGoal(goal)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`badge text-xs ${getStatusColor(goal.status)}`}>{goal.status.replace("-", " ")}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(goal.priority)}`}>{goal.priority}</span>
                </div>
                <h3 className="text-slate-800 font-semibold text-sm leading-tight">{goal.title}</h3>
              </div>
              <div className="flex items-center gap-1 ml-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setEditGoal(goal)}
                  className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteGoal(goal)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">{goal.description}</p>

            {/* Progress */}
            <div className="mb-3">
              <div className="flex justify-between mb-1.5">
                <span className="text-xs text-slate-500">Progress</span>
                <span className="text-xs font-semibold text-slate-700">{goal.progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-indigo-500 transition-all duration-700" style={{ width: `${goal.progress}%` }} />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Flag className="w-3 h-3" />
                {goal.category}
              </span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(goal.deadline)}
                </span>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-green-400 transition-opacity" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <Flag className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No goals found</p>
          <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filters</p>
          <button onClick={() => setShowCreate(true)} className="btn-primary text-sm py-2.5 mt-4">
            Create Your First Goal
          </button>
        </div>
      )}

      {/* Modals */}
      <CreateGoalModal isOpen={showCreate} onClose={() => setShowCreate(false)} onSave={handleCreate} />
      <EditGoalModal isOpen={!!editGoal} goal={editGoal} onClose={() => setEditGoal(null)} onSave={handleEdit} />
      <DeleteModal
        isOpen={!!deleteGoal}
        title="Delete Goal"
        message={`Are you sure you want to delete "${deleteGoal?.title}"? This cannot be undone.`}
        onClose={() => setDeleteGoal(null)}
        onConfirm={handleDelete}
      />
      <GoalDetailSlideOver goal={detailGoal} onClose={() => setDetailGoal(null)} />
    </div>
  );
}
