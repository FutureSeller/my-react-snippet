import { createContext, useContext } from "react";
import { createDescendantContext } from "@chakra-ui/descendant";

import type { UseAccordionReturnType } from "./use-accordion";

interface AccordionContext
  extends Omit<UseAccordionReturnType, "htmlProps" | "descendants"> {}

export const AccordionContext = createContext<AccordionContext | undefined>(
  undefined
);
export const AccordionProvider = AccordionContext.Provider;
export const useAccordionContext = () => useContext(AccordionContext);

export const [
  AccordionDescendantsProvider,
  useAccordionDescendantsContext,
  useAccordionDescendants,
  useAccordionDescendant,
] = createDescendantContext<HTMLButtonElement>();
