import { useState } from "react";
import { X, Flag } from "lucide-react";
import type { Goal } from "@/types";

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Partial<Goal>) => void;
}

export default function CreateGoalModal({ isOpen, onClose, onSave }: CreateGoalModalProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Financial",
    priority: "medium" as Goal["priority"],
    deadline: "",
  });

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ ...form, status: "active", progress: 0 });
    setForm({ title: "", description: "", category: "Financial", priority: "medium", deadline: "" });
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <Flag className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-display font-bold text-slate-900">Create New Goal</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="label">Goal Title *</label>
            <input
              className="input-field"
              placeholder="e.g., Increase revenue by 25%"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea
              className="input-field resize-none h-24"
              placeholder="Describe your goal in detail..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Category</label>
              <select
                className="input-field"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {["Financial", "Product", "HR", "Customer", "Learning", "Operations"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Priority</label>
              <select
                className="input-field"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as Goal["priority"] })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label">Target Deadline</label>
            <input
              type="date"
              className="input-field"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              required
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 btn-primary text-sm py-3">
              Create Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
