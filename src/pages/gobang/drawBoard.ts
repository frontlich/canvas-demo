import { GAP, SIDE, START } from "./utils";


/** 画棋盘 */
export const drawBoard = (ctx: CanvasRenderingContext2D) => {
  ctx.strokeStyle = "#999";
  ctx.lineWidth = 2;
  const [x, y] = START;
  for (let i = 0; i <= SIDE + 1; i += GAP) {
    ctx.beginPath();
    ctx.moveTo(x + i, y);
    ctx.lineTo(x + i, y + SIDE);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y + i);
    ctx.lineTo(x + SIDE, y + i);
    ctx.stroke();
    ctx.closePath();
  }
};
