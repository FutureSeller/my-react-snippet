/**
 * Reference: https://snook.ca/archives/html_and_css/hiding-content-for-accessibility
 *
 * 여기서 Apple's Voice Over는 zero height 요소의 컨텐츠를 읽지 않는다고 하여 테스트 해보았는데,
 * 크롬에선 읽히는데 사파리에서는 안읽힌다. 흠..
 */

const positionAbsoluteAndCollapsed: React.CSSProperties = {
  height: 0,
  overflow: "hidden",
  position: "absolute",
};

export function PositionAbsoluteAndCollapsedPage() {
  return (
    <div>
      <h2 style={positionAbsoluteAndCollapsed}>
        PositionAbsoluteAndCollapsedPage Title
      </h2>
      <p>positionAbsoluteAndCollapsed Body</p>
    </div>
  );
}
