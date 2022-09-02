import { memo, useEffect, useRef } from "react";

import { drawRepel, drawSea } from "./drawSea";

export default memo(() => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext("2d");

      ctx && drawSea(ctx);

      let isStart = false;

      const onStart = (p: Point) => {
        isStart = true;
        ctx && drawRepel(ctx, p);
      };

      const onEnd = () => {
        isStart = false;
        ctx && drawRepel(ctx, [Infinity, Infinity]);
      };

      const draw = (p: Point) => {
        if (isStart && ctx) {
          drawRepel(ctx, p);
        }
      };

      const touchStart = (e: TouchEvent) => {
        e.preventDefault();
        onStart([e.targetTouches[0].clientX, e.targetTouches[0].clientY]);
      };

      const mouseStart = (e: MouseEvent) => {
        onStart([e.clientX, e.clientY]);
      };

      const touchMove = (e: TouchEvent) => {
        e.preventDefault();
        draw([e.targetTouches[0].clientX, e.targetTouches[0].clientY]);
      };

      const mouseMove = (e: MouseEvent) => {
        draw([e.clientX, e.clientY]);
      };

      document.addEventListener("touchstart", touchStart, { passive: false });
      document.addEventListener("touchmove", touchMove, { passive: false });
      document.addEventListener("touchend", onEnd);
      document.addEventListener("mousedown", mouseStart);
      document.addEventListener("mouseup", onEnd);
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("contextmenu", onEnd);

      return () => {
        document.removeEventListener("touchstart", touchStart);
        document.removeEventListener("touchmove", touchMove);
        document.removeEventListener("touchend", onEnd);
        document.removeEventListener("mousedown", mouseStart);
        document.removeEventListener("mouseup", onEnd);
        document.removeEventListener("contextmenu", onEnd);
        document.removeEventListener("mousemove", mouseMove);
      };
    }
  }, []);

  return (
    <canvas
      ref={ref}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ background: "#000" }}
    />
  );
});
