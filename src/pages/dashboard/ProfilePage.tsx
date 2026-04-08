import { useState } from "react";
import { Camera, Save, User, Mail, Building2, Globe, Phone } from "lucide-react";
import { getInitials } from "@/lib/utils";
import type { User as UserType } from "@/types";
import { toast } from "sonner";

interface Props { user: UserType }

export default function ProfilePage({ user }: Props) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    organization: user.organization || "",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Performance-driven professional focused on achieving measurable results through structured goal management.",
    website: "https://propelaxis.com",
  });

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-slate-900">My Profile</h2>
        <p className="text-slate-500 text-sm">Manage your personal information and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green-500 to-indigo-600 flex items-center justify-center text-white font-display font-bold text-3xl mx-auto">
              {getInitials(form.name)}
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-600 to-indigo-600 text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-colors shadow-lg">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <h3 className="font-display font-bold text-slate-900 text-lg">{form.name}</h3>
          <p className="text-slate-500 text-sm">{form.email}</p>
          <div className="mt-3">
            <span className="badge-blue">{user.plan} Plan</span>
          </div>

          <div className="mt-6 space-y-3 text-left">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Building2 className="w-4 h-4 text-slate-400" />
              {form.organization || "No organization"}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Globe className="w-4 h-4 text-slate-400" />
              {form.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Phone className="w-4 h-4 text-slate-400" />
              {form.phone}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-3 gap-2">
            {[{ value: "24", label: "Goals" }, { value: "142", label: "Tasks" }, { value: "7", label: "Streak" }].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-lg font-display font-bold text-slate-900">{s.value}</p>
                <p className="text-slate-400 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-display font-semibold text-slate-900 mb-6">Personal Information</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name</label>
                <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="label">Email Address</label>
                <input type="email" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Organization</label>
                <input className="input-field" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} placeholder="Your organization" />
              </div>
              <div>
                <label className="label">Phone</label>
                <input className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Location</label>
                <input className="input-field" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <div>
                <label className="label">Website</label>
                <input className="input-field" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="label">Bio</label>
              <textarea className="input-field resize-none h-24" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn-primary flex items-center gap-2 text-sm py-2.5">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-display font-semibold text-slate-900 mb-5">Account Activity</h3>
        <div className="space-y-3">
          {[
            { action: "Profile updated", time: "2 hours ago", icon: User },
            { action: "Goal #3 completed — Expand Team by 5 Members", time: "Yesterday", icon: Save },
            { action: "New KPI added — Active Users", time: "3 days ago", icon: Building2 },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-700 text-sm">{item.action}</p>
                </div>
                <span className="text-slate-400 text-xs">{item.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
