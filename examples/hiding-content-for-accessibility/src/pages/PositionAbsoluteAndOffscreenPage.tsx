/**
 * 이런 경우엔, 숨겨진 요소가 focusable 한 경우에 문제가 된다.
 */
const positionAbsoluteAndOffscreenStyle: React.CSSProperties = {
  position: "absolute",
  top: "-999999em",
  left: "auto",
  width: "1px",
  height: "1px",
  overflow: "hidden",
};

export function PositionAbsoluteAndOffscreenPage() {
  return (
    <div>
      <h2 style={positionAbsoluteAndOffscreenStyle}>
        <a href="#">PositionAbsoluteAndOffscreenPage Title</a>
      </h2>
      <p style={{ height: "3000px" }}>PositionAbsoluteAndOffscreenPage Body</p>
    </div>
  );
}
