import { GAP, findPoint } from "./utils";

let isBlack = false;

export const drawPiece = (ctx: CanvasRenderingContext2D, point: Point) => {
  const p = findPoint(point);
  if (p) {
    ctx.beginPath();
    ctx.arc(p[0], p[1], GAP / 3, 0, 2 * Math.PI);
    ctx.fillStyle = isBlack ? "#000" : "#fff";
    isBlack = !isBlack;
    ctx.fill();
    ctx.closePath();
  }
};
