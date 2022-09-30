import { memo, useEffect, useRef } from "react";

import { drawBoard } from "./drawBoard";
import { drawPiece } from "./drawPiece";

export default memo(() => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext("2d");

      ctx && drawBoard(ctx);

      const draw = (e: MouseEvent) => {
        ctx && drawPiece(ctx, [e.clientX, e.clientY]);
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
      style={{ background: "#e5c683", cursor: 'crosshair' }}
    />
  );
});
