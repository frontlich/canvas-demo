import { memo, useEffect, useRef } from "react";

import { drawRect } from "./drawRect";
import { defaultConfig } from "./config";

export default memo(() => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext("2d");

      let isStart = false;
      let point: Point = [0, 0];
      let timer: number;

      const onStart = (p: Point) => {
        if (ref.current) {
          ref.current.style.cursor = "none";
        }
        isStart = true;
        point = [p[0] - defaultConfig.size / 2, p[1] - defaultConfig.size / 2];
        timer = window.setInterval(() => {
          ctx && drawRect(ctx, point);
        }, 100);
      };

      const onEnd = () => {
        if (ref.current) {
          ref.current.style.cursor = "default";
        }
        isStart = false;
        clearInterval(timer);
      };

      const draw = (p: Point) => {
        if (ctx && isStart) {
          point = [
            p[0] - defaultConfig.size / 2,
            p[1] - defaultConfig.size / 2,
          ];
          drawRect(ctx, point);
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
