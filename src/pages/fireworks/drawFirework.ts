import { hex2rgb } from "../../utils/hex2rgb";

const colors = [
  "#ff0",
  "#ff9912",
  "#0ff",
  "#0f0",
  "#7cfc00",
  "#f0f",
  "#ff4500",
  "#1e90ff",
  "#fafff0",
];

const drawAmmo = (
  ctx: CanvasRenderingContext2D,
  point: Point,
  color: string
) => {
  return new Promise<void>((resolve) => {
    let distance = window.innerHeight - point[1];

    const draw = () => {
      if (distance <= 1) {
        resolve();
        return;
      }
      distance = distance * 0.9;

      ctx.beginPath();
      ctx.arc(point[0], point[1] + distance, 5, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();

      requestAnimationFrame(() => {
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.arc(point[0], point[1] + distance, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        draw();
      });
    };

    draw();
  });
};

const drawParticle = (
  ctx: CanvasRenderingContext2D,
  point: Point,
  color: string,
  angle: number,
  speed: number
) => {
  const gra = 10, //重力加速度
    existTime = 3, // 存在时间
    particleSize = 2, //粒子大小
    upSpeed = 10; // 初始的向上的速度

  const speedX = speed * Math.cos(angle),
    speedY = speed * Math.sin(angle) + upSpeed;

  const draw = (t: number) => {
    if (t > existTime) return;

    const temp = [
      point[0] + speedX * t,
      point[1] + (gra * t * t) / 2 - speedY * t,
    ];
    ctx.beginPath();
    ctx.arc(temp[0], temp[1], particleSize, 0, 2 * Math.PI);
    const [r, g, b] = hex2rgb(color);
    const a = existTime - t;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a > 1 ? 1 : a})`;
    ctx.fill();
    ctx.closePath();

    requestAnimationFrame(() => {
      ctx.beginPath();
      ctx.arc(temp[0], temp[1], particleSize + 1, 0, 2 * Math.PI);
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.closePath();
      draw(t + 0.04);
    });
  };

  draw(0);
};

const drawBoom = (
  ctx: CanvasRenderingContext2D,
  point: Point,
  color: string
) => {
  let speed = 30;

  for (let i = 5; i < speed; i += 5) {
    for (let j = ((i % 2) / 20) * Math.PI; j < 2 * Math.PI; j += Math.PI / 10) {
      drawParticle(ctx, point, color, j, i);
    }
  }
};

export const drawFirework = (ctx: CanvasRenderingContext2D, point: Point) => {
  const color = colors[Math.round(Math.random() * (colors.length - 1))];
  drawAmmo(ctx, point, color).then(() => drawBoom(ctx, point, color));
};
