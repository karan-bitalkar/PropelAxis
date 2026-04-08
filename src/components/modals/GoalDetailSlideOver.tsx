import { useState } from "react";
import {
  X, Flag, Calendar, Target, CheckSquare, MessageSquare, TrendingUp,
  Plus, Check, Circle, Clock, User, ChevronRight, Send, Edit2, Trash2
} from "lucide-react";
import type { Goal } from "@/types";
import { formatDate } from "@/lib/utils";

interface Props {
  goal: Goal | null;
  onClose: () => void;
}

const SUBTASKS = [
  { id: "s1", title: "Define success metrics and KPI targets", done: true },
  { id: "s2", title: "Identify stakeholders and assign owners", done: true },
  { id: "s3", title: "Create implementation roadmap", done: false },
  { id: "s4", title: "Schedule progress review meetings", done: false },
  { id: "s5", title: "Finalize budget allocation", done: false },
];

const COMMENTS = [
  { id: "c1", author: "Sarah Chen", avatar: "SC", time: "2h ago", text: "Great progress on this goal! The Q1 metrics are looking strong. Let's keep the momentum going into Q2." },
  { id: "c2", author: "Marcus Johnson", avatar: "MJ", time: "Yesterday", text: "I've updated the KPI targets based on the latest market data. Please review and confirm before the next sync." },
  { id: "c3", author: "You", avatar: "ME", time: "3 days ago", text: "Added the budget breakdown to the shared drive. @Sarah Chen can you validate the financial projections?" },
];

const LINKED_KPIS = [
  { name: "Monthly Revenue", current: 78, target: 100, unit: "%" },
  { name: "Customer NPS", current: 62, target: 70, unit: "pts" },
  { name: "Goal Completion Rate", current: 85, target: 90, unit: "%" },
];

const HISTORY = [
  { date: "Apr 8, 2026", progress: 68, note: "Completed Q1 client onboarding drive" },
  { date: "Apr 1, 2026", progress: 55, note: "Closed 3 new enterprise accounts" },
  { date: "Mar 15, 2026", progress: 40, note: "Launched referral campaign" },
  { date: "Mar 1, 2026", progress: 25, note: "Started outreach to target segment" },
];

const TIMELINE = [
  { label: "Created", date: "Jan 15, 2026", done: true },
  { label: "Planning", date: "Jan 22, 2026", done: true },
  { label: "Execution", date: "Feb 1, 2026", done: true },
  { label: "Mid Review", date: "Apr 1, 2026", done: true },
  { label: "Final Review", date: "Jun 15, 2026", done: false },
  { label: "Deadline", date: "Jun 30, 2026", done: false },
];

const colorMap: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  completed: "bg-slate-100 text-slate-700",
  "at-risk": "bg-red-100 text-red-700",
  paused: "bg-amber-100 text-amber-700",
};

export default function GoalDetailSlideOver({ goal, onClose }: Props) {
  const [subtasks, setSubtasks] = useState(SUBTASKS);
  const [activeTab, setActiveTab] = useState<"overview" | "subtasks" | "kpis" | "comments" | "history">("overview");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(COMMENTS);
  const [newTask, setNewTask] = useState("");

  if (!goal) return null;

  const completedSubtasks = subtasks.filter((s) => s.done).length;

  function toggleSubtask(id: string) {
    setSubtasks(subtasks.map((s) => s.id === id ? { ...s, done: !s.done } : s));
  }

  function addComment() {
    if (!comment.trim()) return;
    setComments([{ id: Date.now().toString(), author: "You", avatar: "ME", time: "Just now", text: comment }, ...comments]);
    setComment("");
  }

  function addSubtask() {
    if (!newTask.trim()) return;
    setSubtasks([...subtasks, { id: Date.now().toString(), title: newTask, done: false }]);
    setNewTask("");
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Target },
    { id: "subtasks", label: "Sub-tasks", icon: CheckSquare },
    { id: "kpis", label: "KPI Links", icon: TrendingUp },
    { id: "comments", label: "Comments", icon: MessageSquare },
    { id: "history", label: "History", icon: Clock },
  ] as const;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-50 shadow-2xl flex flex-col animate-fade-in-right">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colorMap[goal.status] || "bg-slate-100 text-slate-700"}`}>
                {goal.status.replace("-", " ")}
              </span>
              <span className="text-slate-400 text-xs">{goal.category}</span>
            </div>
            <h2 className="font-display text-xl font-bold text-white leading-tight pr-8">{goal.title}</h2>
            <div className="flex items-center gap-4 mt-3">
              <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                Due {formatDate(goal.deadline)}
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                <Flag className="w-3.5 h-3.5" />
                {goal.priority} priority
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Overall Progress</span>
            <span className="text-sm font-bold text-slate-900">{goal.progress}%</span>
          </div>
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${goal.progress}%`,
                background: "linear-gradient(90deg, #6366f1, #8b5cf6)"
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
            <span>Started {formatDate(goal.createdAt)}</span>
            <span>{completedSubtasks}/{subtasks.length} sub-tasks done</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 overflow-x-auto px-6 bg-white">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-violet-600 text-violet-700"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Description</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{goal.description || "No description provided for this goal."}</p>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Goal Timeline</h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-100" />
                  <div className="space-y-4">
                    {TIMELINE.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${
                          item.done ? "bg-violet-600 text-white" : "bg-white border-2 border-slate-200 text-slate-400"
                        }`}>
                          {item.done ? <Check className="w-4 h-4" /> : <Circle className="w-3 h-3" />}
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                          <span className={`text-sm font-medium ${item.done ? "text-slate-800" : "text-slate-400"}`}>{item.label}</span>
                          <span className="text-xs text-slate-400">{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-tasks Tab */}
          {activeTab === "subtasks" && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-700">Sub-tasks ({completedSubtasks}/{subtasks.length})</h3>
                <div className="text-xs text-slate-400">{Math.round((completedSubtasks / subtasks.length) * 100)}% complete</div>
              </div>

              {/* Add subtask */}
              <div className="flex gap-2">
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSubtask()}
                  placeholder="Add a sub-task..."
                  className="flex-1 px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                />
                <button onClick={addSubtask} className="p-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {subtasks.map((task) => (
                  <div key={task.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${task.done ? "bg-slate-50 border-slate-100" : "bg-white border-slate-200"}`}>
                    <button
                      onClick={() => toggleSubtask(task.id)}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        task.done ? "bg-violet-600 border-violet-600 text-white" : "border-slate-300 hover:border-violet-400"
                      }`}
                    >
                      {task.done && <Check className="w-3 h-3" />}
                    </button>
                    <span className={`flex-1 text-sm ${task.done ? "line-through text-slate-400" : "text-slate-700"}`}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KPI Links Tab */}
          {activeTab === "kpis" && (
            <div className="p-6 space-y-4">
              <h3 className="text-sm font-semibold text-slate-700">Linked KPI Metrics</h3>
              <div className="space-y-4">
                {LINKED_KPIS.map((kpi, i) => {
                  const pct = Math.round((kpi.current / kpi.target) * 100);
                  return (
                    <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-slate-800 text-sm">{kpi.name}</span>
                        <span className="text-xs font-bold text-violet-700 bg-violet-50 px-2 py-1 rounded-lg">{pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                        <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-700" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Current: <strong className="text-slate-700">{kpi.current}{kpi.unit}</strong></span>
                        <span>Target: <strong className="text-slate-700">{kpi.target}{kpi.unit}</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === "comments" && (
            <div className="p-6 space-y-4">
              {/* Input */}
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">ME</div>
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment... Use @mention to tag team members"
                    rows={2}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 resize-none"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={addComment}
                      className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 text-white text-xs font-semibold rounded-lg hover:bg-violet-700 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Post
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {c.avatar}
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-slate-800">{c.author}</span>
                        <span className="text-xs text-slate-400">{c.time}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div className="p-6 space-y-4">
              <h3 className="text-sm font-semibold text-slate-700">Progress Update History</h3>
              <div className="space-y-3">
                {HISTORY.map((h, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-violet-100 transition-colors">
                    <div className="text-center min-w-[60px]">
                      <div className="text-2xl font-display font-bold text-violet-600">{h.progress}%</div>
                      <div className="text-xs text-slate-400 mt-0.5">progress</div>
                    </div>
                    <div className="h-12 w-px bg-slate-100 flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700">{h.note}</p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{h.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
