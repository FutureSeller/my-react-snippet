import { useEffect, useState } from "react";
import { useControllableState } from "my-custom-hooks";

import { useAccordionDescendants } from "./accordion-context";

export interface UseAccordionProps {
  allowToggle?: boolean;
  index?: number;
  defaultIndex?: number;
  onChange?(expandedIndex: number): void;
}

export type UseAccordionReturnType = ReturnType<typeof useAccordion>;

export function useAccordion(props: UseAccordionProps) {
  const {
    onChange,
    defaultIndex,
    index: indexProps,
    allowToggle,
    ...htmlProps
  } = props;

  const descendants = useAccordionDescendants();

  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    return () => {
      setFocusedIndex(-1);
    };
  }, []);

  const [index, setIndex] = useControllableState({
    value: indexProps,
    defaultValue() {
      return defaultIndex ?? -1;
    },
    onChange,
  });

  const getAccordionItemProps = (idx: number | null) => {
    let isOpen = false;

    if (idx !== null) {
      isOpen = index === idx;
    }

    const onChange = (isOpen: boolean) => {
      if (idx === null) {
        return;
      }

      if (isOpen) {
        setIndex(idx);
      } else if (allowToggle) {
        setIndex(-1);
      }
    };

    return { isOpen, onChange };
  };

  return {
    index,
    setIndex,
    descendants,
    htmlProps,
    getAccordionItemProps,
    focusedIndex,
    setFocusedIndex,
  };
}
