'use client';

import { useEffect } from 'react';

interface DirectionProviderProps {
  lang: string;
  children: React.ReactNode;
}

export function DirectionProvider({ lang, children }: DirectionProviderProps) {
  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang]);

  return <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>{children}</div>;
}
