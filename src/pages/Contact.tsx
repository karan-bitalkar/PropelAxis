import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Building2, Globe } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const offices = [
  { city: "San Francisco", country: "United States", address: "100 Innovation Drive, SF, CA 94105", phone: "+1 (888) 776-7352", timezone: "PST (UTC-8)" },
  { city: "London", country: "United Kingdom", address: "15 Finsbury Square, London EC2A 1HD", phone: "+44 20 7946 0958", timezone: "GMT (UTC+0)" },
  { city: "Singapore", country: "Singapore", address: "71 Robinson Road, #14-01, Singapore 068895", phone: "+65 6789 1234", timezone: "SGT (UTC+8)" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", message: "", subject: "General Inquiry" });
  const [submitted, setSubmitted] = useState(false);
  useScrollReveal();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-dark-950">
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8">
            <MessageSquare className="w-4 h-4" />
            Get in Touch
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
            Let's Start a<br />
            <span className="gradient-text">Conversation</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Whether you have a question, need a demo, or want to discuss enterprise pricing — our team is ready to help.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="bg-dark-900 py-16 px-4">
        <div className="container-max">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: MessageSquare, title: "Sales Inquiry", desc: "Talk to our sales team about plans, custom pricing, and enterprise solutions.", action: "sales@propelaxis.com" },
              { icon: Mail, title: "General Support", desc: "Have a question or need help? Our support team responds within 4 hours.", action: "support@propelaxis.com" },
              { icon: Building2, title: "Partnerships", desc: "Interested in becoming a PropelAxis partner, reseller, or integration partner.", action: "partners@propelaxis.com" },
            ].map((opt, i) => {
              const Icon = opt.icon;
              return (
                <div key={opt.title} className={`reveal stagger-${i + 1} glass-card p-6 border border-white/10 hover:border-blue-500/30 transition-all text-center`}>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{opt.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{opt.desc}</p>
                  <a href={`mailto:${opt.action}`} className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">{opt.action}</a>
                </div>
              );
            })}
          </div>

          {/* Form + Info */}
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Form */}
            <div className="lg:col-span-3 reveal-left">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h2 className="font-display text-2xl font-bold text-white mb-2">Send a Message</h2>
                <p className="text-slate-400 text-sm mb-8">Fill out the form and we'll get back to you within 24 hours.</p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-white font-display font-bold text-xl mb-2">Message Sent</h3>
                    <p className="text-slate-400 text-sm">Thank you for reaching out. Our team will respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label text-slate-300">Full Name *</label>
                        <input className="input-field bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-blue-500" placeholder="Alex Thompson" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                      </div>
                      <div>
                        <label className="label text-slate-300">Email Address *</label>
                        <input type="email" className="input-field bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-blue-500" placeholder="alex@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label text-slate-300">Company</label>
                        <input className="input-field bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-blue-500" placeholder="Company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                      </div>
                      <div>
                        <label className="label text-slate-300">Your Role</label>
                        <input className="input-field bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-blue-500" placeholder="e.g., CEO, Manager" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label className="label text-slate-300">Subject</label>
                      <select className="input-field bg-white/5 border-white/10 text-white focus:border-blue-500" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                        {["General Inquiry", "Sales / Pricing", "Technical Support", "Partnership", "Enterprise Demo", "Other"].map((s) => (
                          <option key={s} value={s} className="bg-dark-800">{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label text-slate-300">Message *</label>
                      <textarea
                        className="input-field bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-blue-500 resize-none h-32"
                        placeholder="Tell us how we can help..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                      />
                    </div>
                    <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 py-4">
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 reveal-right space-y-6">
              <div className="glass-card p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold">Response Times</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sales inquiries</span>
                    <span className="text-white font-medium">Within 2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">General support</span>
                    <span className="text-white font-medium">Within 4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Enterprise support</span>
                    <span className="text-emerald-400 font-medium">Within 1 hour</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-4">Support Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Monday – Friday</span>
                    <span className="text-white">8AM – 8PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Saturday</span>
                    <span className="text-white">9AM – 5PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sunday</span>
                    <span className="text-slate-500">Closed</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-slate-400">Enterprise 24/7</span>
                    <span className="text-emerald-400">Always available</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-4">Direct Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-300 text-sm">hello@propelaxis.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-300 text-sm">+1 (888) 776-7352</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="bg-dark-950 section-padding">
        <div className="container-max">
          <div className="text-center mb-12 reveal">
            <h2 className="font-display text-4xl font-bold text-white mb-4">Global Offices</h2>
            <p className="text-slate-400">We're wherever you are.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {offices.map((office, i) => (
              <div key={office.city} className={`reveal stagger-${i + 1} glass-card p-6 border border-white/10 hover:border-blue-500/30 transition-all`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{office.city}</h3>
                    <p className="text-slate-500 text-xs">{office.country}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-slate-400">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-500" />
                    {office.address}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Phone className="w-4 h-4 text-slate-500" />
                    {office.phone}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4 text-slate-500" />
                    {office.timezone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
