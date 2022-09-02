import { memo, useEffect, useRef } from "react";
import { drawFirework } from "./drawFirework";

export default memo(() => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext("2d");

      const draw = (e: MouseEvent) => {
        ctx && drawFirework(ctx, [e.clientX, e.clientY]);
      }
     
      document.addEventListener('click', draw);

      return () => document.removeEventListener('click', draw);
    }
  }, []);

  return (
    <canvas
      ref={ref}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ background: "#000", cursor: 'crosshair' }}
    />
  );
});
