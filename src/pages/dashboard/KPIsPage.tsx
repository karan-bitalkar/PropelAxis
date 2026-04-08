import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, ArrowUp, ArrowDown, Target, Plus } from "lucide-react";
import { MOCK_KPIS } from "@/constants";
import type { KPI } from "@/types";
import {
  RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell
} from "recharts";
import { toast } from "sonner";

export default function KPIsPage() {
  const [kpis, setKpis] = useState<KPI[]>(MOCK_KPIS);
  const [showAdd, setShowAdd] = useState(false);
  const [newKpi, setNewKpi] = useState({ name: "", current: "", target: "", unit: "", category: "Financial" });

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const kpi: KPI = {
      id: Date.now().toString(),
      name: newKpi.name,
      current: Number(newKpi.current),
      target: Number(newKpi.target),
      unit: newKpi.unit,
      trend: "stable",
      change: 0,
      category: newKpi.category,
    };
    setKpis([kpi, ...kpis]);
    setNewKpi({ name: "", current: "", target: "", unit: "", category: "Financial" });
    setShowAdd(false);
    toast.success("KPI added successfully!");
  }

  const chartData = kpis.map((k) => ({
    name: k.name.length > 15 ? k.name.substring(0, 15) + "..." : k.name,
    current: Math.round((k.current / k.target) * 100),
    target: 100,
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900">KPI Tracker</h2>
          <p className="text-slate-500 text-sm">{kpis.length} metrics tracked across {[...new Set(kpis.map((k) => k.category))].length} categories</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-primary flex items-center gap-2 text-sm py-2.5">
          <Plus className="w-4 h-4" /> Add KPI
        </button>
      </div>

      {/* Add KPI form */}
      {showAdd && (
        <div className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm animate-fade-in">
          <h3 className="font-semibold text-slate-900 mb-4">New KPI</h3>
          <form onSubmit={handleAdd} className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <input className="input-field sm:col-span-2" placeholder="KPI Name *" value={newKpi.name} onChange={(e) => setNewKpi({ ...newKpi, name: e.target.value })} required />
            <input className="input-field" type="number" placeholder="Current" value={newKpi.current} onChange={(e) => setNewKpi({ ...newKpi, current: e.target.value })} required />
            <input className="input-field" type="number" placeholder="Target" value={newKpi.target} onChange={(e) => setNewKpi({ ...newKpi, target: e.target.value })} required />
            <input className="input-field" placeholder="Unit (%, $, pts...)" value={newKpi.unit} onChange={(e) => setNewKpi({ ...newKpi, unit: e.target.value })} />
            <select className="input-field" value={newKpi.category} onChange={(e) => setNewKpi({ ...newKpi, category: e.target.value })}>
              {["Financial", "Operations", "Customer", "Growth", "Learning"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="flex gap-2 sm:col-span-3 lg:col-span-6">
              <button type="submit" className="btn-primary text-sm py-2.5 px-5">Add KPI</button>
              <button type="button" onClick={() => setShowAdd(false)} className="text-sm py-2.5 px-5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi) => {
          const pct = Math.min(Math.round((kpi.current / kpi.target) * 100), 100);
          const TrendIcon = kpi.trend === "up" ? TrendingUp : kpi.trend === "down" ? TrendingDown : Minus;
          return (
            <div key={kpi.id} className="stat-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-slate-500 font-medium">{kpi.category}</p>
                  <h3 className="text-slate-800 font-semibold text-sm mt-0.5">{kpi.name}</h3>
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${kpi.trend === "up" ? "text-emerald-700 bg-emerald-50" : kpi.trend === "down" ? "text-red-600 bg-red-50" : "text-slate-600 bg-slate-100"}`}>
                  <TrendIcon className="w-3 h-3" />
                  {kpi.trend === "stable" ? "Stable" : `+${kpi.change}`}
                </span>
              </div>

              <div className="flex items-end gap-1 mb-3">
                <span className="text-2xl font-display font-bold text-slate-900">{kpi.unit === "$" ? `$${kpi.current.toLocaleString()}` : `${kpi.current}${kpi.unit}`}</span>
                <span className="text-slate-400 text-xs mb-1">/ {kpi.unit === "$" ? `$${kpi.target.toLocaleString()}` : `${kpi.target}${kpi.unit}`}</span>
              </div>

              <div className="progress-bar mb-2">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{pct}% of target</span>
                <span className={`text-xs font-semibold ${pct >= 90 ? "text-emerald-600" : pct >= 70 ? "text-blue-600" : "text-amber-600"}`}>
                  {pct >= 90 ? "On Track" : pct >= 70 ? "In Progress" : "Needs Attention"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-display font-semibold text-slate-900 mb-6">KPI Achievement Overview</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={120} />
            <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
            <Bar dataKey="current" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Achievement">
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.current >= 80 ? "#10b981" : entry.current >= 60 ? "#3b82f6" : "#f59e0b"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
