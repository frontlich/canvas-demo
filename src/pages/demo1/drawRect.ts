import { defaultConfig } from "./config";

const { size: INITIAL_SIZE, colors } = defaultConfig;

/**
 * @desc 二阶贝塞尔
 * @param {number} t 当前百分比
 * @param {Point} p1 起点坐标
 * @param {Point} cp 控制点
 * @param {Point} p2 终点坐标
 */
function bezier(t: number, p1: Point, cp: Point, p2: Point): Point {
  const [x1, y1] = p1;
  const [cx, cy] = cp;
  const [x2, y2] = p2;
  let x = (1 - t) * (1 - t) * x1 + 2 * t * (1 - t) * cx + t * t * x2;
  let y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * cy + t * t * y2;
  return [x, y];
}

/** 获取贝塞尔曲线的控制点和终点 */
function getBezierPoint(point: Point): [Point, Point] {
  // 消失距离
  const distance = INITIAL_SIZE * 2;
  // 消失的方向，角度
  const direct = Math.random() * 2 * Math.PI;

  const endPoint: Point = [
    point[0] + distance * Math.sin(direct),
    point[1] + distance * Math.cos(direct),
  ];

  const centerPoint = [
    (point[0] + endPoint[0]) / 2,
    (point[1] + endPoint[1]) / 2,
  ];

  const controlPoint: Point = [
    centerPoint[0] - INITIAL_SIZE * Math.sin(direct),
    centerPoint[1] - INITIAL_SIZE * Math.cos(direct),
  ];

  return [controlPoint, endPoint];
}

export const drawRect = (ctx: CanvasRenderingContext2D, point: Point) => {
  let size = INITIAL_SIZE,
    rafTask: number;
  const color = colors[Math.round(Math.random() * colors.length)];
  // 矩形填充

  const [controlPoint, endPoint] = getBezierPoint(point);

  const draw = () => {
    if (size === 0) {
      cancelAnimationFrame(rafTask);
      return;
    }

    size = size < 0.05 ? 0 : size * 0.95;

    const [left, top] = bezier(
      1 - size / INITIAL_SIZE,
      point,
      controlPoint,
      endPoint
    );

    ctx.fillStyle = color;
    ctx.fillRect(left, top, size, size);
    rafTask = requestAnimationFrame(() => {
      ctx.clearRect(left - 0.5, top - 0.5, size + 1, size + 1); // 清除时扩大1像素，防止留下残影
      draw();
    });
  };

  draw();
};
