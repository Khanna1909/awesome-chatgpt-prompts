'use client';

import { useState } from 'react';
import { Copy, Sparkles } from 'lucide-react';
import { buildPrompt, type PromptItem } from '@/data/prompts';

export function PromptCard({ item }: { item: PromptItem }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const prompt = buildPrompt(item);

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1300);
  }

  return (
    <article className="glass rounded-[28px] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/25">
      <div className="mb-4 flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[.16em] text-white/45">
        <span>#{String(item.id).padStart(2, '0')}</span>
        <span>{item.category}</span>
      </div>

      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-future-cyan">
        <Sparkles size={14} /> Prompt Style
      </div>

      <h3 className="text-2xl font-black tracking-[-.04em] text-future-ink">{item.title}</h3>
      <p className="mt-2 text-lg font-bold text-future-cyan">{item.subtitle}</p>
      <p className="mt-4 text-sm leading-6 text-future-muted"><b className="text-future-ink">Когда использовать:</b> {item.use}</p>
      <p className="mt-3 text-sm leading-6 text-future-muted"><b className="text-future-ink">Визуальный принцип:</b> {item.visual}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white/60">{tag}</span>)}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={() => setOpen(!open)} className="rounded-full bg-gradient-to-r from-future-pink to-future-cyan px-5 py-3 text-sm font-black text-white shadow-glow">
          {open ? 'Скрыть промпт' : 'Показать промпт'}
        </button>
        <button onClick={copyPrompt} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-future-ink">
          <Copy size={16} /> {copied ? 'Скопировано' : 'Копировать'}
        </button>
      </div>

      {open && <pre className="copy-block mt-6">{prompt}</pre>}
    </article>
  );
}
