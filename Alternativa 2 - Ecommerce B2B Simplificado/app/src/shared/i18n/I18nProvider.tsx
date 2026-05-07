"use client";

import { createContext, useContext, ReactNode } from "react";

const I18nContext = createContext<{ dict: any; locale: string } | null>(null);

export function I18nProvider({ 
  children, 
  dict, 
  locale 
}: { 
  children: ReactNode; 
  dict: any; 
  locale: string; 
}) {
  return (
    <I18nContext.Provider value={{ dict, locale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
