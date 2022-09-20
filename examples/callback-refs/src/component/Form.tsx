import { useState, forwardRef, useRef, useEffect, Ref, RefObject } from "react";

export const Form = forwardRef<HTMLInputElement, any>((props, ref) => {
  const [show, setShow] = useState(false);

  return (
    <form>
      <button
        type="button"
        onClick={() => {
          setShow(true);
        }}
      >
        show
      </button>
      {show && <input ref={ref} />}
    </form>
  );
});
Form.displayName = "Examples-Callback-Refs-Form";
