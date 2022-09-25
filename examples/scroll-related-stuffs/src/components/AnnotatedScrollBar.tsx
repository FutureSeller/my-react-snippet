import "./AnnotatedScrollBar.css";

import { useState, useEffect, useRef } from "react";
import { clsx } from "clsx";

const ANNOTATED_BAR_HEIGHT = 32;

export function AnnotatedScrollBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutIdRef = useRef<number | null>(null);

  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState<{
    percent: number;
    distance: string;
  }>({
    percent: 0,
    distance: "0px",
  });

  useEffect(() => {
    const targetRefCurrent = containerRef.current;

    if (targetRefCurrent) {
      const containerHeight = targetRefCurrent.clientHeight;
      const scrollHeight = targetRefCurrent.scrollHeight;

      const handleScroll = () => {
        const progress =
          targetRefCurrent.scrollTop / (scrollHeight - containerHeight);

        let distance = progress * scrollHeight;
        if (distance >= scrollHeight - ANNOTATED_BAR_HEIGHT) {
          distance = scrollHeight - ANNOTATED_BAR_HEIGHT;
        }

        setProgress({
          percent: Math.round(progress * 100),
          distance: `${distance}px`,
        });
        setShow(true);
      };

      targetRefCurrent.addEventListener("scroll", handleScroll);

      return () => {
        targetRefCurrent.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (show) {
      if (timeoutIdRef.current) {
        window.clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = window.setTimeout(() => {
        setShow(false);
      }, 1000);

      return () => {
        if (timeoutIdRef.current) {
          window.clearTimeout(timeoutIdRef.current);
        }
      };
    }
  }, [show]);

  return (
    <div className="AnnotatedScrollBar__container" ref={containerRef}>
      <div style={{ position: "relative" }}>
        <div
          className={clsx("AnnotatedScrollBar__scrollbar", {
            AnnotatedScrollBar__visible: show,
            AnnotatedScrollBar__hide: !show,
          })}
          style={{ top: progress.distance }}
        >
          Progress ({progress.percent}%)
        </div>
      </div>
      <div className="AnnotatedScrollBar__content">!!Scroll down!!</div>
    </div>
  );
}
