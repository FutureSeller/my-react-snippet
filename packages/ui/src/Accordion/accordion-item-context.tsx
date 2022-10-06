import { createContext, useContext } from "react";
import type { UseAccordionItemReturn } from "./use-accordion-item";

type AccordionItemContext = Omit<UseAccordionItemReturn, "htmlProps">;

export const AccordionItemContext = createContext<
  AccordionItemContext | undefined
>(undefined);

export const AccordionItemProvider = AccordionItemContext.Provider;
export const useAccordionItemContext = () => useContext(AccordionItemContext);
