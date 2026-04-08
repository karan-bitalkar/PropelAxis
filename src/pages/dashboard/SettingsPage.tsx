import { useState } from "react";
import { Bell, Shield, Palette, CreditCard, Save, ChevronRight } from "lucide-react";
import { toast } from "sonner";

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-green-600" : "bg-slate-200"}`}
    >
      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

export default function SettingsPage() {
  const [notifs, setNotifs] = useState({ email: true, push: false, weekly: true, milestones: true, teamUpdates: false });
  const [privacy, setPrivacy] = useState({ publicProfile: false, shareProgress: true, analytics: true });
  const [appearance, setAppearance] = useState({ theme: "light", density: "comfortable", language: "en" });

  function save() { toast.success("Settings saved successfully!"); }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500 text-sm">Manage your account preferences and configurations</p>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
            <Bell className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="font-display font-semibold text-slate-900">Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            { key: "email", label: "Email Notifications", desc: "Receive goal updates and alerts via email" },
            { key: "push", label: "Push Notifications", desc: "Browser and mobile push notifications" },
            { key: "weekly", label: "Weekly Digest", desc: "Summary of your weekly performance every Monday" },
            { key: "milestones", label: "Milestone Alerts", desc: "Notify when goals reach key progress milestones" },
            { key: "teamUpdates", label: "Team Updates", desc: "Updates from team members on shared goals" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
              <div>
                <p className="text-slate-800 font-medium text-sm">{item.label}</p>
                <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
              </div>
              <Toggle
                checked={notifs[item.key as keyof typeof notifs]}
                onChange={() => setNotifs({ ...notifs, [item.key]: !notifs[item.key as keyof typeof notifs] })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
            <Shield className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-display font-semibold text-slate-900">Privacy & Security</h3>
        </div>
        <div className="space-y-4">
          {[
            { key: "publicProfile", label: "Public Profile", desc: "Allow others to find and view your profile" },
            { key: "shareProgress", label: "Share Progress", desc: "Let team members see your goal progress" },
            { key: "analytics", label: "Usage Analytics", desc: "Help us improve by sharing anonymous usage data" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
              <div>
                <p className="text-slate-800 font-medium text-sm">{item.label}</p>
                <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
              </div>
              <Toggle
                checked={privacy[item.key as keyof typeof privacy]}
                onChange={() => setPrivacy({ ...privacy, [item.key]: !privacy[item.key as keyof typeof privacy] })}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <button className="text-sm text-green-600 font-medium hover:text-green-700 flex items-center gap-1">
            Change Password <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
            <Palette className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="font-display font-semibold text-slate-900">Appearance</h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Theme</label>
            <select className="input-field" value={appearance.theme} onChange={(e) => setAppearance({ ...appearance, theme: e.target.value })}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          <div>
            <label className="label">Density</label>
            <select className="input-field" value={appearance.density} onChange={(e) => setAppearance({ ...appearance, density: e.target.value })}>
              <option value="compact">Compact</option>
              <option value="comfortable">Comfortable</option>
              <option value="spacious">Spacious</option>
            </select>
          </div>
          <div>
            <label className="label">Language</label>
            <select className="input-field" value={appearance.language} onChange={(e) => setAppearance({ ...appearance, language: e.target.value })}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="font-display font-semibold text-slate-900">Subscription</h3>
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-100 mb-4">
          <div>
            <p className="font-semibold text-green-900">Professional Plan</p>
            <p className="text-green-700 text-sm">$29/month — Billed annually</p>
            <p className="text-green-600 text-xs mt-1">Next renewal: May 1, 2026</p>
          </div>
          <span className="badge-green">Active</span>
        </div>
        <div className="flex gap-3">
          <button className="btn-outline text-sm py-2.5">Upgrade Plan</button>
          <button className="text-slate-500 text-sm hover:text-red-500 transition-colors py-2.5 px-4">Cancel Subscription</button>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button onClick={save} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save All Settings
        </button>
      </div>
    </div>
  );
}
