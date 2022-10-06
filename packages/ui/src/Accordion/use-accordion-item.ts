import { useId, useRef, useCallback } from "react";
import { mergeRefs } from "@chakra-ui/react-use-merge-refs";
import { callAllHandlers, warn } from "@chakra-ui/shared-utils";

import {
  useAccordionContext,
  useAccordionDescendant,
} from "./accordion-context";

export interface UseAccordionItemProps {
  isDisabled?: boolean;
  isFocusable?: boolean;
  id?: string;
}

export function useAccordionItem(props: UseAccordionItemProps) {
  const { isDisabled, isFocusable, id, ...htmlProps } = props;
  const { getAccordionItemProps, setFocusedIndex } = useAccordionContext()!;

  const buttonRef = useRef<HTMLElement>(null);

  const reactId = useId();
  const uid = id ?? reactId;

  const buttonId = `accordion-button-${uid}`;
  const panelId = `accordion-panel-${uid}`;

  const { register, index, descendants } = useAccordionDescendant({
    disabled: isDisabled && !isFocusable,
  });

  const { isOpen, onChange } = getAccordionItemProps(
    index === -1 ? null : index
  );

  const onOpen = () => {
    onChange(true);
  };

  const onClose = () => {
    onChange(false);
  };

  const onClick = useCallback(() => {
    onChange(!isOpen);
    setFocusedIndex(index);
  }, [index, setFocusedIndex, isOpen, onChange]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const keyMap: Record<string, React.KeyboardEventHandler> = {
        ArrowDown: () => {
          const next = descendants.nextEnabled(index);
          next?.node.focus();
        },
        ArrowUp: () => {
          const prev = descendants.prevEnabled(index);
          prev?.node.focus();
        },
        Home: () => {
          const first = descendants.firstEnabled();
          first?.node.focus();
        },
        End: () => {
          const last = descendants.lastEnabled();
          last?.node.focus();
        },
      };

      const action = keyMap[event.key];

      if (action) {
        event.preventDefault();
        action(event);
      }
    },
    [descendants, index]
  );

  const onFocus = useCallback(() => {
    setFocusedIndex(index);
  }, [setFocusedIndex, index]);

  const getButtonProps = useCallback(
    function getButtonProps(
      props: Omit<React.HTMLAttributes<HTMLElement>, "color"> = {},
      ref: React.Ref<HTMLButtonElement> | null = null
    ): React.ComponentProps<"button"> {
      return {
        ...props,
        type: "button",
        ref: mergeRefs(register, buttonRef, ref),
        id: buttonId,
        disabled: !!isDisabled,
        "aria-expanded": !!isOpen,
        "aria-controls": panelId,
        onClick: callAllHandlers(props.onClick, onClick),
        onFocus: callAllHandlers(props.onFocus, onFocus),
        onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      };
    },
    [
      buttonId,
      isDisabled,
      isOpen,
      onClick,
      onFocus,
      onKeyDown,
      panelId,
      register,
    ]
  );

  const getPanelProps = useCallback(
    function getPanelProps<T>(
      props: Omit<React.HTMLAttributes<T>, "color"> = {},
      ref: React.Ref<T> | null = null
    ): React.HTMLAttributes<T> & React.RefAttributes<T> {
      return {
        ...props,
        ref,
        role: "region",
        id: panelId,
        "aria-labelledby": buttonId,
        hidden: !isOpen,
      };
    },
    [buttonId, isOpen, panelId]
  );

  return {
    isOpen,
    isDisabled,
    isFocusable,
    onOpen,
    onClose,
    getButtonProps,
    getPanelProps,
    htmlProps,
  };
}

export type UseAccordionItemReturn = ReturnType<typeof useAccordionItem>;
