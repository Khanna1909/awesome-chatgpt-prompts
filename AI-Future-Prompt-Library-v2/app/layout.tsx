import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Future Prompt Library',
  description: 'Профессиональная библиотека промптов для инфографики, AI-визуала и обучения.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
