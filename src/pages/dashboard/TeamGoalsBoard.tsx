import { useState, useRef } from "react";
import {
  Plus, Search, MessageSquare, AtSign, ArrowUp, ArrowDown,
  GripVertical, Send, Activity, User, Clock, Flag, Target, CheckSquare, Zap
} from "lucide-react";
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";

interface TeamGoal {
  id: string;
  title: string;
  description: string;
  owner: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "backlog" | "active" | "review" | "done";
  progress: number;
  dueDate: string;
  comments: number;
  members: string[];
}

const TEAM_MEMBERS = ["Sarah Chen", "Marcus Johnson", "Elena Rodriguez", "David Kim", "Priya Patel"];

const INITIAL_GOALS: TeamGoal[] = [
  { id: "g1", title: "Q2 Revenue Target: $1.2M", description: "Drive new business and upsell existing accounts to hit Q2 revenue", owner: "David Kim", priority: "critical", status: "active", progress: 68, dueDate: "Jun 30, 2026", comments: 8, members: ["David Kim", "Sarah Chen"] },
  { id: "g2", title: "Product Launch: Mobile App v2.0", description: "Complete final QA, staging, and release of mobile app version 2", owner: "Marcus Johnson", priority: "high", status: "active", progress: 45, dueDate: "May 15, 2026", comments: 12, members: ["Marcus Johnson", "Elena Rodriguez"] },
  { id: "g3", title: "Improve Customer NPS to 72", description: "Enhance support workflows and customer success touchpoints", owner: "Sarah Chen", priority: "high", status: "review", progress: 80, dueDate: "May 30, 2026", comments: 5, members: ["Sarah Chen"] },
  { id: "g4", title: "Team Onboarding Process Redesign", description: "Create a structured 30-60-90 day onboarding plan for new hires", owner: "Elena Rodriguez", priority: "medium", status: "backlog", progress: 15, dueDate: "Jul 15, 2026", comments: 3, members: ["Elena Rodriguez", "Priya Patel"] },
  { id: "g5", title: "Q2 Analytics Dashboard Rollout", description: "Deploy new analytics dashboards for all team leads by end of quarter", owner: "Priya Patel", priority: "medium", status: "done", progress: 100, dueDate: "Apr 5, 2026", comments: 6, members: ["Priya Patel", "Marcus Johnson"] },
];

const ACTIVITY_FEED = [
  { id: "a1", author: "Sarah Chen", action: "updated progress on", target: "Improve Customer NPS", time: "10m ago", type: "progress" },
  { id: "a2", author: "Marcus Johnson", action: "commented on", target: "Product Launch: Mobile App v2.0", time: "35m ago", type: "comment" },
  { id: "a3", author: "David Kim", action: "moved to Review", target: "Q2 Revenue Target", time: "1h ago", type: "status" },
  { id: "a4", author: "Elena Rodriguez", action: "created goal", target: "Team Onboarding Process Redesign", time: "3h ago", type: "create" },
  { id: "a5", author: "Priya Patel", action: "completed", target: "Q2 Analytics Dashboard Rollout", time: "Yesterday", type: "done" },
  { id: "a6", author: "Sarah Chen", action: "mentioned @Marcus Johnson in", target: "NPS improvement notes", time: "Yesterday", type: "mention" },
];

const COLUMNS = [
  { id: "backlog", label: "Backlog", color: "bg-slate-100 text-slate-600", dot: "bg-slate-400" },
  { id: "active", label: "In Progress", color: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500" },
  { id: "review", label: "In Review", color: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  { id: "done", label: "Completed", color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
] as const;

const priorityConfig = {
  critical: { label: "Critical", cls: "bg-rose-100 text-rose-700" },
  high: { label: "High", cls: "bg-orange-100 text-orange-700" },
  medium: { label: "Medium", cls: "bg-amber-100 text-amber-700" },
  low: { label: "Low", cls: "bg-slate-100 text-slate-500" },
};

const activityIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  progress: TrendingUpIcon,
  comment: MessageSquare,
  status: Flag,
  create: Plus,
  done: CheckSquare,
  mention: AtSign,
};

function TrendingUpIcon({ className }: { className?: string }) {
  return <ArrowUp className={className} />;
}

function GoalCard({
  goal,
  onMove,
  onComment,
}: {
  goal: TeamGoal;
  onMove: (id: string, dir: "up" | "down") => void;
  onComment: (goal: TeamGoal) => void;
}) {
  const pc = priorityConfig[goal.priority];

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all group cursor-grab active:cursor-grabbing">
      <div className="p-4">
        {/* Priority + drag handle */}
        <div className="flex items-center justify-between mb-2.5">
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${pc.cls}`}>{pc.label}</span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onMove(goal.id, "up")} className="p-1 hover:bg-slate-100 rounded transition-colors">
              <ArrowUp className="w-3 h-3 text-slate-400" />
            </button>
            <button onClick={() => onMove(goal.id, "down")} className="p-1 hover:bg-slate-100 rounded transition-colors">
              <ArrowDown className="w-3 h-3 text-slate-400" />
            </button>
            <GripVertical className="w-4 h-4 text-slate-300" />
          </div>
        </div>

        <h4 className="font-semibold text-slate-800 text-sm leading-snug mb-2">{goal.title}</h4>
        <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">{goal.description}</p>

        {/* Progress */}
        {goal.status !== "done" && (
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-slate-400">Progress</span>
              <span className="text-xs font-semibold text-slate-700">{goal.progress}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <div className="flex -space-x-2">
            {goal.members.slice(0, 3).map((m) => (
              <div
                key={m}
                title={m}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-[10px] font-bold border-2 border-white"
              >
                {getInitials(m)}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />{goal.dueDate}
            </span>
            <button
              onClick={() => onComment(goal)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-600 transition-colors px-1.5 py-1 rounded hover:bg-indigo-50"
            >
              <MessageSquare className="w-3 h-3" />
              {goal.comments}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamGoalsBoard() {
  const [goals, setGoals] = useState<TeamGoal[]>(INITIAL_GOALS);
  const [search, setSearch] = useState("");
  const [commentGoal, setCommentGoal] = useState<TeamGoal | null>(null);
  const [commentText, setCommentText] = useState("");
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalOwner, setNewGoalOwner] = useState(TEAM_MEMBERS[0]);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = goals.filter((g) =>
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.owner.toLowerCase().includes(search.toLowerCase())
  );

  function moveGoal(id: string, dir: "up" | "down") {
    const idx = goals.findIndex((g) => g.id === id);
    if (dir === "up" && idx > 0) {
      const updated = [...goals];
      [updated[idx], updated[idx - 1]] = [updated[idx - 1], updated[idx]];
      setGoals(updated);
    } else if (dir === "down" && idx < goals.length - 1) {
      const updated = [...goals];
      [updated[idx], updated[idx + 1]] = [updated[idx + 1], updated[idx]];
      setGoals(updated);
    }
  }

  function postComment() {
    if (!commentText.trim() || !commentGoal) return;
    setGoals(goals.map((g) => g.id === commentGoal.id ? { ...g, comments: g.comments + 1 } : g));
    toast.success("Comment posted!");
    setCommentText("");
    setCommentGoal(null);
  }

  function addGoal() {
    if (!newGoalTitle.trim()) return;
    const newGoal: TeamGoal = {
      id: Date.now().toString(),
      title: newGoalTitle,
      description: "New team goal — add details to get started.",
      owner: newGoalOwner,
      priority: "medium",
      status: "backlog",
      progress: 0,
      dueDate: "TBD",
      comments: 0,
      members: [newGoalOwner],
    };
    setGoals([newGoal, ...goals]);
    toast.success("Team goal created!");
    setNewGoalTitle("");
    setShowNewGoal(false);
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900">Team Goals Board</h2>
          <p className="text-slate-500 text-sm">{goals.length} total goals · {goals.filter((g) => g.status === "active").length} in progress</p>
        </div>
        <button onClick={() => setShowNewGoal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
          <Plus className="w-4 h-4" />
          New Team Goal
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-sm"
          placeholder="Search goals or members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* New Goal Form */}
      {showNewGoal && (
        <div className="bg-white rounded-2xl p-5 border border-indigo-200 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4 text-sm">Create New Team Goal</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <input
              ref={inputRef}
              value={newGoalTitle}
              onChange={(e) => setNewGoalTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addGoal()}
              placeholder="Goal title..."
              className="px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
              autoFocus
            />
            <select
              value={newGoalOwner}
              onChange={(e) => setNewGoalOwner(e.target.value)}
              className="px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400"
            >
              {TEAM_MEMBERS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={addGoal} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
              Create Goal
            </button>
            <button onClick={() => setShowNewGoal(false)} className="px-4 py-2 text-slate-500 text-sm font-medium rounded-xl hover:bg-slate-100 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Board Columns */}
        <div className="lg:col-span-4 grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {COLUMNS.map((col) => {
            const colGoals = filtered.filter((g) => g.status === col.id);
            return (
              <div key={col.id} className="space-y-3">
                {/* Column header */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${col.dot}`} />
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${col.color}`}>{col.label}</span>
                  </div>
                  <span className="text-slate-400 text-xs font-semibold">{colGoals.length}</span>
                </div>

                {/* Cards */}
                <div className="space-y-3 min-h-[200px]">
                  {colGoals.map((goal) => (
                    <GoalCard
                      key={goal.id}
                      goal={goal}
                      onMove={moveGoal}
                      onComment={setCommentGoal}
                    />
                  ))}
                  {colGoals.length === 0 && (
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
                      <Target className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                      <p className="text-slate-400 text-xs">No goals here</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm h-fit">
          <div className="flex items-center gap-2 mb-5">
            <Activity className="w-4 h-4 text-indigo-600" />
            <h3 className="font-display font-semibold text-slate-900 text-sm">Activity Feed</h3>
          </div>
          <div className="space-y-4">
            {ACTIVITY_FEED.map((item) => {
              const Icon = activityIcon[item.type] || Activity;
              return (
                <div key={item.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong className="font-semibold">{item.author}</strong>{" "}
                      {item.action}{" "}
                      <span className="text-indigo-600 font-medium">{item.target}</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* @Mention Quick Add */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
              <AtSign className="w-3 h-3" /> Quick Mention
            </p>
            <div className="flex gap-2">
              <div className="flex-1 flex flex-wrap gap-1">
                {TEAM_MEMBERS.slice(0, 3).map((m) => (
                  <button
                    key={m}
                    onClick={() => toast.success(`Mentioned @${m.split(" ")[0]}`)}
                    className="flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[9px] font-bold">
                      {getInitials(m)}
                    </div>
                    {m.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      {commentGoal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-scale-in">
            <div className="p-5 border-b border-slate-100">
              <h3 className="font-display font-bold text-slate-900 text-sm">Comment on Goal</h3>
              <p className="text-slate-500 text-xs mt-0.5 truncate">{commentGoal.title}</p>
            </div>
            <div className="p-5 space-y-3">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment... use @name to mention a team member"
                rows={4}
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none"
                autoFocus
              />
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-400">Mention:</span>
                {TEAM_MEMBERS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setCommentText((prev) => prev + ` @${m.split(" ")[0]} `)}
                    className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    @{m.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-5 pt-0 flex gap-2 justify-end">
              <button onClick={() => setCommentGoal(null)} className="px-4 py-2.5 text-slate-500 text-sm font-medium rounded-xl hover:bg-slate-100 transition-colors">
                Cancel
              </button>
              <button onClick={postComment} className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                <Send className="w-4 h-4" /> Post Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
