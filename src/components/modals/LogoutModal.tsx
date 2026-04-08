import { useNavigate } from "react-router-dom";
import { LogOut, X, AlertTriangle } from "lucide-react";
import { logout } from "@/lib/auth";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <LogOut className="w-6 h-6 text-red-500" />
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          <h2 className="text-xl font-display font-bold text-slate-900 mb-2">Confirm Logout</h2>
          <p className="text-slate-500 text-sm mb-8">
            Are you sure you want to logout? You will need to sign in again to access your dashboard.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
