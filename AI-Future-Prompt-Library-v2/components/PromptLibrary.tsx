'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { PromptCard } from './PromptCard';
import type { PromptItem } from '@/data/prompts';

export function PromptLibrary({ items }: { items: PromptItem[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Все');

  const categories = useMemo(() => ['Все', ...Array.from(new Set(items.map((item) => item.category)))], [items]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    return items.filter((item) => {
      const categoryOk = category === 'Все' || item.category === category;
      const haystack = `${item.title} ${item.subtitle} ${item.category} ${item.use} ${item.visual} ${item.tags.join(' ')}`.toLowerCase();
      return categoryOk && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [items, query, category]);

  return (
    <section id="library" className="shell py-16">
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[.18em] text-future-pink">Prompt Library</p>
          <h2 className="max-w-3xl text-4xl font-black tracking-[-.05em] text-future-ink md:text-6xl">Библиотека стилей инфографики</h2>
        </div>
        <label className="glass flex w-full items-center gap-3 rounded-2xl px-4 py-3 lg:w-[380px]">
          <Search size={20} className="text-future-cyan" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти стиль, тему или тег" className="w-full bg-transparent text-future-ink outline-none placeholder:text-white/35" />
        </label>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((item) => (
          <button key={item} onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-sm font-black transition ${category === item ? 'border-transparent bg-future-ink text-future-bg' : 'border-white/10 bg-white/5 text-white/70 hover:border-white/25'}`}>
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {filtered.map((item) => <PromptCard key={item.id} item={item} />)}
      </div>

      {!filtered.length && (
        <div className="glass mt-8 rounded-[28px] p-8 text-future-muted">Ничего не найдено. Даже поиск сделал вид, что занят.</div>
      )}
    </section>
  );
}
