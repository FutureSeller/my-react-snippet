/* 
  Reference: https://www.a11yproject.com/posts/how-to-hide-content/

  - `display: none`을 사용하면 render tree에서 없어져버리기때문에, 어떤 컨텐츠가 있는지 알아야하는 screen reader 유저 등은 알 방법이 없음.
  - 보통 검색 입력칸에서 icon을 보여주고 해당 label을 가리는 용도로 씀.
 */

import React, { HTMLProps } from "react";

// NOTE: clip pattern
const style: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  overflow: "hidden",
  whiteSpace: "nowrap",
};

export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span style={style}>{children}</span>;
}

export function VisuallyHiddenInput({
  children,
  ...rest
}: HTMLProps<HTMLInputElement>) {
  return (
    <input {...rest} style={style}>
      {children}
    </input>
  );
}
