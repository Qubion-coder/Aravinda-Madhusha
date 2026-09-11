import React, { useState } from 'react';
import { Copy, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

export default function AdminPage() {
  const [prefix, setPrefix] = useState('');
  const [guestName, setGuestName] = useState('');
  
  const [generated, setGenerated] = useState<{url: string, message: string} | null>(null);
  const [copiedType, setCopiedType] = useState<'link' | 'message' | null>(null);

  const generateMessage = (pfx: string, name: string, url: string) => {
    let greeting = `Dear ${name}`;
    if (pfx) {
      if (pfx.toLowerCase() === 'dear') {
        greeting = `Dear ${name}`;
      } else if (pfx.toLowerCase() === 'family') {
        greeting = `Dear ${name} & Family`;
      } else {
        greeting = `Dear ${pfx} ${name}`;
      }
    }

    return `${greeting},\n\nYou are warmly invited to celebrate the wedding of Aravinda & Madhusha! 💍✨\n\n📅 November 16, 2026\n📍 Regal Gateway Luxury Banquet, Hettipola Road, Karagahagedara, Kuliyapitiya\n\n📞 RSVP:\nAravinda: 071 524 4006\nMadhusha: 071 869 1636\n\nOpen your personal invitation here:\n${url}\n\nWe look forward to seeing you there! 🎊`;
  };

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    const params = new URLSearchParams();
    if (prefix) params.set('prefix', prefix);
    params.set('guest', guestName.trim());
    const url = `${window.location.origin}/?${params.toString()}`;
    const message = generateMessage(prefix, guestName.trim(), url);
    setGenerated({ url, message });
  };

  const copyToClipboard = (text: string, type: 'link' | 'message') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-xl border border-[#EAE1D3] p-8 md:p-10 mb-8">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-[#F7E7CE] rounded-full flex items-center justify-center mb-4 shadow-inner">
            <LinkIcon className="text-[#8B7355] w-6 h-6" />
          </div>
          <h1 className="serif text-3xl md:text-4xl text-[#3D2B1F] tracking-widest uppercase font-bold text-center">Link Generator</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-[12px] uppercase tracking-[0.2em] font-extrabold text-[#111111] mb-2">Select Prefix</label>
            <select 
              value={prefix} 
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full p-4 border-2 border-[#C8B29E] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#111111] font-serif text-[#111111] font-bold text-xl"
            >
              <option value="">No Prefix</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Miss">Miss</option>
              <option value="Mr. & Mrs.">Mr. & Mrs.</option>
              <option value="Family">Family</option>
              <option value="Dear">Dear</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] uppercase tracking-[0.2em] font-extrabold text-[#111111] mb-2">Guest Name</label>
            <input 
              type="text" 
              placeholder="e.g. Sanjaya" 
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full p-4 border-2 border-[#C8B29E] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#111111] font-serif text-[#111111] font-bold text-xl placeholder:text-zinc-500"
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={!guestName.trim()}
            className="w-full py-4 bg-[#1A120B] text-white rounded-xl uppercase tracking-widest font-extrabold text-base hover:bg-[#3D2817] transition-colors disabled:opacity-50 shadow-lg cursor-pointer"
          >
            Generate Link
          </button>
        </div>
      </div>

      {generated && (
        <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-xl border border-[#C8B29E] p-8 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="serif text-2xl text-[#111111] uppercase tracking-widest font-extrabold mb-6 text-center">Generated Message</h2>
          
          <div className="bg-[#FAF7F2] p-6 rounded-xl border border-[#C8B29E] mb-6 font-serif text-[#111111] font-medium whitespace-pre-wrap text-base leading-relaxed">
            {generated.message}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button 
              onClick={() => copyToClipboard(generated.url, 'link')}
              className={`flex-1 py-4 flex items-center justify-center gap-2 rounded-xl transition-colors text-sm uppercase tracking-wider font-extrabold cursor-pointer ${copiedType === 'link' ? 'bg-green-100 text-green-700 border-2 border-green-500' : 'bg-white text-[#111111] border-2 border-[#111111] hover:bg-[#FAF7F2]'}`}
            >
              {copiedType === 'link' ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              Copy Link Only
            </button>
            <button 
              onClick={() => copyToClipboard(generated.message, 'message')}
              className={`flex-1 py-4 flex items-center justify-center gap-2 rounded-xl transition-colors text-sm uppercase tracking-wider font-extrabold cursor-pointer ${copiedType === 'message' ? 'bg-green-100 text-green-700 border-2 border-green-500' : 'bg-[#1A120B] text-white hover:bg-[#3D2817] shadow-lg'}`}
            >
              {copiedType === 'message' ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              Copy Full Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
