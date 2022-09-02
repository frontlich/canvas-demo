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

      const onStart = (e: MouseEvent) => {
        if (ref.current) {
          ref.current.style.cursor = "none";
        }
        isStart = true;
        point = [
          e.clientX - defaultConfig.size / 2,
          e.clientY - defaultConfig.size / 2,
        ];
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

      const draw = (e: MouseEvent) => {
        if (ctx && isStart) {
          point = [
            e.clientX - defaultConfig.size / 2,
            e.clientY - defaultConfig.size / 2,
          ];
          drawRect(ctx, point);
        }
      };

      document.addEventListener("mousedown", onStart);
      document.addEventListener("mouseup", onEnd);
      document.addEventListener("mousemove", draw);
      document.addEventListener("contextmenu", onEnd);

      return () => {
        document.removeEventListener("mousedown", onStart);
        document.removeEventListener("mouseup", onEnd);
        document.removeEventListener("contextmenu", onEnd);
        document.removeEventListener("mousemove", draw);
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
