import React, { useEffect, useRef, useState } from "react";
import { Mail, X, Send } from "lucide-react";

const ContactForm = ({ endpoint = "/api/contact", buttonLabel = "Contact" }) => {

     const [open, setOpen] = useState(false);
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const firstFieldRef = useRef(null);
  const closeBtnRef = useRef(null);


  // focus management: focus first field on open
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => {
        firstFieldRef.current?.focus();
      }, 120); // match animation timing
      // listen for ESC
      const onKey = (e) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        clearTimeout(t);
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  // simple validation
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field) => (ev) => {
    setForm((s) => ({ ...s, [field]: ev.target.value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus({ loading: true, ok: null, msg: "" });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus({ loading: false, ok: true, msg: "Thanks — message sent." });
      setForm({ name: "", email: "", message: "" });
      // auto-close after short delay
      setTimeout(() => setOpen(false), 1000);
    } catch (err) {
      setStatus({ loading: false, ok: false, msg: "Failed to send — try again later." });
    }
  };

  return (
    <div>
        {/* Floating button */}
      <div className="fixed right-6 bottom-6 z-50">
        <button
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="flex items-center gap-3 bg-linear-to-br from-yellow-400 to-yellow-300 text-purple-900 font-semibold px-4 py-3 rounded-full shadow-lg hover:scale-[1.03] transition focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          <Mail size={18} />
          <span className="hidden sm:inline">{buttonLabel}</span>
        </button>
      </div>

       {/* Backdrop */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 transition-opacity ${open ? "opacity-80 visible" : "opacity-0 invisible"} bg-black/40`}
      />

        {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Contact form"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-50 h-full w-full sm:w-[420px] max-w-full transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full bg-white shadow-2xl border-l border-gray-100 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-linear-to-br from-purple-700 to-purple-800 w-10 h-10 flex items-center justify-center text-yellow-300 font-bold">NEX</div>
              <div>
                <div className="font-semibold text-purple-800">Contact Nexter FM</div>
                <div className="text-xs text-gray-500">We reply within 48 hours</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                ref={closeBtnRef}
                onClick={() => setOpen(false)}
                aria-label="Close contact form"
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body / form */}
          <div className="p-4 overflow-auto flex-1">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="cd-name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  id="cd-name"
                  ref={firstFieldRef}
                  value={form.name}
                  onChange={handleChange("name")}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                    errors.name ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="cd-email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="cd-email"
                  value={form.email}
                  onChange={handleChange("email")}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                    errors.email ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="cd-message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="cd-message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange("message")}
                  className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                    errors.message ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="How can we help?"
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-gray-600">
                  {status.loading && <span>Sending…</span>}
                  {status.ok === true && <span className="text-green-600">{status.msg}</span>}
                  {status.ok === false && <span className="text-red-600">{status.msg}</span>}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={status.loading}
                    className="inline-flex items-center gap-2 bg-linear-to-br from-yellow-400 to-yellow-300 text-purple-900 font-semibold px-4 py-2 rounded-lg shadow hover:scale-[1.02] transition"
                  >
                    <Send size={14} />
                    <span className="text-sm">{status.loading ? "Sending" : "Send"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setForm({ name: "", email: "", message: "" }); setErrors({}); setStatus({ loading: false, ok: null, msg: "" }); }}
                    className="text-sm px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 transition"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>

            {/* small footer note */}
            <div className="mt-4 text-xs text-gray-500">
              By sending you agree to our <a className="text-purple-700 underline" href="/privacy">privacy policy</a>.
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default ContactForm