import { getDistance } from "../../utils/distance";

const radius = 2, // 粒子半径大小
  repelRadius = 100, // 排斥圈半径
  speed = [0.01, 0.1], // 排斥速度
  gridWith = 30; // 粒子间距

const particleSea: Point[] = [],
  defaultSea: Point[] = [];
for (let i = radius; i < window.innerWidth; i += gridWith) {
  for (let j = radius; j < window.innerHeight; j += gridWith) {
    particleSea.push([i, j]);
    defaultSea.push([i, j]);
  }
}

const drawPoint = (ctx: CanvasRenderingContext2D, point: Point) => {
  ctx.beginPath();
  ctx.arc(point[0], point[1], radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#666";
  ctx.fill();
  ctx.closePath();
};

const clearPoint = (ctx: CanvasRenderingContext2D, point: Point) => {
  ctx.beginPath();
  ctx.arc(point[0], point[1], radius + 1, 0, 2 * Math.PI);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.closePath();
};

const movePoint = (target: Point, p: Point, i: number) => {
  const distance = getDistance(target, p);

  // 防止边缘抖动，设置一定阈值，应该怎么计算目前不知道，试出来的
  if (distance - repelRadius < 15) {
    const k = (target[1] - p[1]) / (target[0] - p[0]);
    const angle = Math.atan(k);
    const s = speed[1] - ((speed[1] - speed[0]) * distance) / repelRadius;
    const diff = target[0] - p[0] > 0 ? -distance * s : distance * s;
    const dX = diff * Math.cos(angle);
    const dY = diff * Math.sin(angle);
    particleSea[i] = [p[0] + dX, p[1] + dY];
  } else {
    const d = defaultSea[i];
    if (p[0] !== d[0] || p[1] !== d[1]) {
      const awayDistance = getDistance(d, p);

      const k = (d[1] - p[1]) / (d[0] - p[0]);
      const angle = Math.atan(k);
      const s = speed[0] + ((speed[1] - speed[0]) * awayDistance) / repelRadius;
      const diff = d[0] - p[0] > 0 ? awayDistance * s : -awayDistance * s;
      const dX = diff * Math.cos(angle);
      const dY = diff * Math.sin(angle);
      particleSea[i] = [p[0] + dX, p[1] + dY];
    }
  }
};

export const drawRepelPoint = (ctx: CanvasRenderingContext2D, point: Point) => {
  const temp = [...particleSea];

  particleSea.forEach((p, i) => {
    movePoint(point, p, i);
  });

  particleSea.forEach(([x, y], i) => {
    const [m, n] = temp[i];
    if (x !== m || y !== n) {
      clearPoint(ctx, [m, n]);
      drawPoint(ctx, [x, y]);
    }
  });
};

let task: number;
export const drawRepel = (ctx: CanvasRenderingContext2D, point: Point) => {
  drawRepelPoint(ctx, point);
  cancelAnimationFrame(task);

  task = requestAnimationFrame(() => {
    drawRepel(ctx, point);
  });
};

export const drawSea = (ctx: CanvasRenderingContext2D) => {
  defaultSea.forEach((point) => drawPoint(ctx, point));
};
