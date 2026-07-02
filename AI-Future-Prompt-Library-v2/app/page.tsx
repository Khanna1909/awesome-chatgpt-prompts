import { ArrowRight, Sparkles, Database, Copy, Search } from 'lucide-react';
import { PromptLibrary } from '@/components/PromptLibrary';
import { prompts } from '@/data/prompts';

const stats = [
  { label: 'стилей в первой сборке', value: prompts.length },
  { label: 'категорий на старте', value: 1 },
  { label: 'готово к масштабированию', value: '∞' }
];

export default function HomePage() {
  return (
    <main>
      <header className="shell py-8">
        <nav className="flex items-center justify-between gap-4">
          <div className="text-xl font-black tracking-[-.04em] text-future-ink">AI Future <span className="gradient-text">Prompt Library</span></div>
          <a href="#library" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-white/80 transition hover:border-white/25">Открыть библиотеку</a>
        </nav>
      </header>

      <section className="shell grid min-h-[70vh] items-center gap-10 py-16 lg:grid-cols-[1.25fr_.75fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-future-cyan">
            <Sparkles size={16} /> Next.js версия библиотеки
          </div>
          <h1 className="max-w-5xl text-5xl font-black leading-[.94] tracking-[-.07em] text-future-ink md:text-7xl lg:text-8xl">
            Промпты для <span className="gradient-text">инфографики</span>, которые не выглядят как шаблон из подвала
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-future-muted md:text-xl">
            Профессиональная библиотека стилей для AI-визуала: поиск, фильтры, карточки, копирование промптов и архитектура, которую можно расширить до сотен материалов.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#library" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-future-pink to-future-cyan px-6 py-4 text-sm font-black text-white shadow-glow">
              Перейти к промптам <ArrowRight size={18} />
            </a>
            <a href="https://github.com/Khanna1909/awesome-chatgpt-prompts/tree/main/AI-Future-Prompt-Library-v2" className="rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-black text-white/75 transition hover:border-white/25">
              Код на GitHub
            </a>
          </div>
        </div>

        <aside className="glass rounded-[36px] p-6">
          <div className="mb-6 rounded-[28px] border border-white/10 bg-black/25 p-6">
            <p className="mb-2 text-xs font-black uppercase tracking-[.18em] text-future-pink">Product core</p>
            <h2 className="text-3xl font-black tracking-[-.05em] text-future-ink">AI Future Hub</h2>
            <p className="mt-3 text-sm leading-6 text-future-muted">Эта версия станет ядром для большой библиотеки: промпты, AI-сервисы, агенты, материалы курсов и подборки.</p>
          </div>
          <div className="grid gap-3">
            <Feature icon={<Search size={18} />} title="Поиск" text="По названию, тегам и назначению." />
            <Feature icon={<Copy size={18} />} title="Copy Prompt" text="Полный промпт раскрывается и копируется." />
            <Feature icon={<Database size={18} />} title="Данные отдельно" text="Промпты хранятся в data, а не замурованы в HTML." />
          </div>
        </aside>
      </section>

      <section className="shell grid gap-4 py-8 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="glass rounded-[28px] p-6">
            <div className="text-4xl font-black tracking-[-.05em] text-future-ink">{item.value}</div>
            <div className="mt-2 text-sm font-bold text-future-muted">{item.label}</div>
          </div>
        ))}
      </section>

      <PromptLibrary items={prompts} />
    </main>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-future-cyan">{icon}</div>
      <div>
        <div className="font-black text-future-ink">{title}</div>
        <p className="text-sm leading-6 text-future-muted">{text}</p>
      </div>
    </div>
  );
}
