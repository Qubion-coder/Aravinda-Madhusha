import React, { useState, useEffect } from "react";

export default function WishesForm() {
  const endpoint = "https://script.google.com/macros/s/AKfycbwcCfrAy858SthNwi5nfKDLy8R2-Ad0pSa90O9um6YU6K-YqsZmfNDnpKmsySFSNY6B/exec";

  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Auto-detect name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('guest');
    if (guestName) {
      setName(guestName);
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!message.trim()) {
      setErrorMessage("Please enter your message.");
      return;
    }

    // Since we don't have a backend yet, we'll just mock the success state if no endpoint is defined.
    // If you add a real endpoint to .env, it will use that.
    if (!endpoint) {
      setSubmitting(true);
      setTimeout(() => {
        setSuccessMessage("Your wishes have been saved. Thank you!");
        setMessage(""); // Clear the message on success
        setSubmitting(false);
      }, 1000);
      return;
    }

    const payload = {
      name: name.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    setSubmitting(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSuccessMessage("Your wishes have been saved. Thank you!");
      setMessage(""); // Clear the message on success
    } catch {
      try {
        const fd = new FormData();
        fd.append("payload", JSON.stringify(payload));
        await fetch(endpoint, { method: "POST", mode: "no-cors", body: fd });
        setSuccessMessage("Your wishes have been submitted. Thank you!");
        setMessage(""); // Clear the message on success
      } catch {
        setErrorMessage("Could not submit wishes. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={submit} className="space-y-4 px-2">
        <div>
          <input
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="Your Name"
            className="w-full rounded-xl border-2 border-[#C8B29E] bg-white px-4 py-3 text-base text-brand-plum font-serif font-bold placeholder:text-zinc-600 outline-none focus:border-brand-plum focus:ring-1 focus:ring-[#1A120B]"
          />
        </div>

        <div>
          <textarea
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            placeholder="Write your wishes for the couple..."
            rows={4}
            className="w-full rounded-xl border-2 border-[#C8B29E] bg-white px-4 py-3 text-base text-brand-plum font-serif font-bold placeholder:text-zinc-600 outline-none focus:border-brand-plum focus:ring-1 focus:ring-[#1A120B] resize-none"
          />
        </div>

        {errorMessage && <p className="text-[12px] text-red-600 font-bold">{errorMessage}</p>}
        {successMessage && <p className="text-[12px] text-brand-plum font-extrabold">{successMessage}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-plum text-white py-3.5 rounded-xl text-[12px] uppercase tracking-widest font-extrabold disabled:opacity-60 shadow-lg transition-colors hover:bg-[#3D2817] mt-2 cursor-pointer"
        >
          {submitting ? "Sending..." : "Send Wishes"}
        </button>
      </form>
    </div>
  );
}
