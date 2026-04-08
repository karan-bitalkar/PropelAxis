import { useState } from "react";
import { X, Pencil } from "lucide-react";
import type { Goal } from "@/types";

interface EditGoalModalProps {
  isOpen: boolean;
  goal: Goal | null;
  onClose: () => void;
  onSave: (goal: Goal) => void;
}

export default function EditGoalModal({ isOpen, goal, onClose, onSave }: EditGoalModalProps) {
  const [form, setForm] = useState<Goal | null>(goal);

  if (!isOpen || !goal) return null;

  const current = form || goal;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (current) onSave(current);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
              <Pencil className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-lg font-display font-bold text-slate-900">Edit Goal</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="label">Goal Title</label>
            <input
              className="input-field"
              value={current.title}
              onChange={(e) => setForm({ ...current, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea
              className="input-field resize-none h-24"
              value={current.description}
              onChange={(e) => setForm({ ...current, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Status</label>
              <select
                className="input-field"
                value={current.status}
                onChange={(e) => setForm({ ...current, status: e.target.value as Goal["status"] })}
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
                <option value="at-risk">At Risk</option>
              </select>
            </div>
            <div>
              <label className="label">Progress (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                className="input-field"
                value={current.progress}
                onChange={(e) => setForm({ ...current, progress: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <div>
            <label className="label">Deadline</label>
            <input
              type="date"
              className="input-field"
              value={current.deadline}
              onChange={(e) => setForm({ ...current, deadline: e.target.value })}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm py-3 rounded-xl transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
