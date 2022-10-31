import { useRef, useImperativeHandle, forwardRef } from "react";
import { createPortal } from "react-dom";
import { css, keyframes } from "@emotion/css";

import type { HTMLProps } from "react";

const fadeIn = keyframes`
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
`;

interface DialogHandle {
  showModal: () => void;
  close: () => void;
}

interface Props extends HTMLProps<HTMLDialogElement> {}

export const Dialog = forwardRef<DialogHandle, Props>(
  (props, dialogHandleRef) => {
    const ref = useRef<HTMLDialogElement>(null);

    useImperativeHandle(
      dialogHandleRef,
      () => ({
        showModal() {
          ref.current?.showModal();
        },
        close() {
          ref.current?.close();
        },
      }),
      []
    );

    return (
      <>
        {createPortal(
          <dialog
            ref={ref}
            className={css`
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
              border: none;
              border-radius: 10px;

              &::backdrop {
                background: linear-gradient(
                  rgba(0, 0, 0, 0.1),
                  rgba(0, 0, 0, 0.4)
                );
                animation: ${fadeIn} 1s;
              }
            `}
          >
            {props.children}
          </dialog>,
          document.querySelector("#dialog")!
        )}
      </>
    );
  }
);

Dialog.displayName = "Dialog";
