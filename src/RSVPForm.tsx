import React, { useState, useEffect } from "react";

export default function RSVPForm() {
  const endpoint = "https://script.google.com/macros/s/AKfycbwcCfrAy858SthNwi5nfKDLy8R2-Ad0pSa90O9um6YU6K-YqsZmfNDnpKmsySFSNY6B/exec";

  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [name, setName] = useState<string>("");

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

    if (!endpoint) {
      setErrorMessage("RSVP saving is not configured yet.");
      return;
    }

    const payload = {
      name: name.trim(),
      attendance,
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
      setSuccessMessage("RSVP saved. Thank you!");
    } catch {
      try {
        const fd = new FormData();
        fd.append("payload", JSON.stringify(payload));
        await fetch(endpoint, { method: "POST", mode: "no-cors", body: fd });
        setSuccessMessage("RSVP submitted. Thank you!");
      } catch {
        setErrorMessage("Could not submit RSVP. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={submit} className="space-y-4 px-2">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAttendance("yes")}
            className={`py-3 rounded-xl text-[12px] uppercase tracking-widest font-extrabold border-2 transition-all cursor-pointer ${
              attendance === "yes"
                ? "bg-brand-plum text-white border-brand-plum shadow-md"
                : "bg-white text-brand-plum border-[#C8B29E] hover:border-brand-plum"
            }`}
          >
            Yes, I will attend
          </button>
          <button
            type="button"
            onClick={() => setAttendance("no")}
            className={`py-3 rounded-xl text-[12px] uppercase tracking-widest font-extrabold border-2 transition-all cursor-pointer ${
              attendance === "no"
                ? "bg-brand-plum text-white border-brand-plum shadow-md"
                : "bg-white text-brand-plum border-[#C8B29E] hover:border-brand-plum"
            }`}
          >
            No, I cannot
          </button>
        </div>

        <div>
          <input
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="Guest Name"
            className="w-full rounded-xl border-2 border-[#C8B29E] bg-white px-4 py-3 text-base text-brand-plum font-serif font-bold placeholder:text-zinc-600 outline-none focus:border-brand-plum focus:ring-1 focus:ring-[#1A120B]"
          />
        </div>

        {errorMessage && <p className="text-[12px] text-red-600 font-bold">{errorMessage}</p>}
        {successMessage && <p className="text-[12px] text-brand-plum font-extrabold">{successMessage}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand-plum text-white py-3.5 rounded-xl text-[12px] uppercase tracking-widest font-extrabold disabled:opacity-60 shadow-lg transition-colors hover:bg-[#3D2817] mt-2 cursor-pointer"
        >
          {submitting ? "Submitting..." : "Submit RSVP"}
        </button>
      </form>
    </div>
  );
}
