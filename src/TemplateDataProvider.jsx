import { createContext, useContext } from "react";

const TemplateDataContext = createContext({ versions: [], releases: {} });

export const TemplateDataProvider = TemplateDataContext.Provider;

export function useTemplateData() {
  return useContext(TemplateDataContext);
}
