import { useState } from "react";

// text-indent는 완벽하지 않다.
const textIndentStyle: React.CSSProperties = {
  textIndent: "-1200px",
  outline: 0,
  width: "100%",
};

export function TextIndentPage() {
  const [direction, setDirection] =
    useState<React.CSSProperties["direction"]>("ltr");

  return (
    <div style={{ width: "100%", marginLeft: "-800px" }}>
      <h2 style={{ ...textIndentStyle, direction }}>TextIndentPage Title</h2>
      <button
        onClick={() => {
          setDirection(direction === "ltr" ? "rtl" : "ltr");
        }}
      >
        toggle {direction}
      </button>
    </div>
  );
}
