import { X, Trash2, AlertTriangle } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({ isOpen, title = "Delete Item", message = "Are you sure you want to delete this? This action cannot be undone.", onClose, onConfirm }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          <h2 className="text-xl font-display font-bold text-slate-900 mb-2">{title}</h2>
          <p className="text-slate-500 text-sm mb-8">{message}</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button
              onClick={() => { onConfirm(); onClose(); }}
              className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
