import { useState } from "react";
import { Bell, CheckCircle, AlertTriangle, Info, XCircle, Check, Trash2, Filter } from "lucide-react";
import { MOCK_NOTIFICATIONS } from "@/constants";
import { formatRelativeTime } from "@/lib/utils";
import type { Notification } from "@/types";
import { toast } from "sonner";

const typeIcon = (type: Notification["type"]) => {
  const map = {
    success: { icon: CheckCircle, cls: "text-emerald-500 bg-emerald-50" },
    warning: { icon: AlertTriangle, cls: "text-amber-500 bg-amber-50" },
    error: { icon: XCircle, cls: "text-red-500 bg-red-50" },
    info: { icon: Info, cls: "text-blue-500 bg-blue-50" },
  };
  return map[type];
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  function markRead(id: string) {
    setNotifications(notifications.map((n) => n.id === id ? { ...n, read: true } : n));
  }

  function markAllRead() {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read.");
  }

  function deleteNotif(id: string) {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast.success("Notification dismissed.");
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900">Notifications</h2>
          <p className="text-slate-500 text-sm">{unreadCount} unread notifications</p>
        </div>
        <div className="flex gap-3">
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-2 text-sm text-green-600 font-medium hover:text-green-700 px-4 py-2 rounded-xl border border-green-200 hover:bg-green-50 transition-colors">
              <Check className="w-4 h-4" /> Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: notifications.length, color: "text-slate-900" },
          { label: "Unread", value: unreadCount, color: "text-blue-600" },
          { label: "Success", value: notifications.filter((n) => n.type === "success").length, color: "text-emerald-600" },
          { label: "Alerts", value: notifications.filter((n) => n.type === "warning" || n.type === "error").length, color: "text-amber-600" },
        ].map((s) => (
          <div key={s.label} className="stat-card text-center">
            <p className={`text-2xl font-display font-bold ${s.color}`}>{s.value}</p>
            <p className="text-slate-500 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "unread"].map((f) => (
          <button key={f} onClick={() => setFilter(f as typeof filter)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${filter === f ? "bg-gradient-to-r from-green-600 to-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-green-300"}`}>
            {f === "all" ? "All Notifications" : `Unread (${unreadCount})`}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
            <Bell className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No notifications</p>
          </div>
        ) : (
          filtered.map((notif) => {
            const { icon: Icon, cls } = typeIcon(notif.type);
            return (
              <div
                key={notif.id}
                className={`bg-white rounded-2xl p-5 border shadow-sm flex items-start gap-4 transition-all ${!notif.read ? "border-green-100 bg-green-50/20" : "border-slate-100"}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cls}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`font-semibold text-sm ${!notif.read ? "text-slate-900" : "text-slate-700"}`}>{notif.title}</p>
                      <p className="text-slate-500 text-sm mt-0.5">{notif.message}</p>
                      <p className="text-slate-400 text-xs mt-2">{formatRelativeTime(notif.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!notif.read && (
                        <button onClick={() => markRead(notif.id)} className="text-xs text-green-600 font-medium hover:text-green-700 px-2 py-1 rounded-lg hover:bg-green-50 transition-colors">
                          Mark read
                        </button>
                      )}
                      <button onClick={() => deleteNotif(notif.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
                {!notif.read && <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-2" />}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
