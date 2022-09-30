export const LINE_COUNT = 15; // 15 * 15 的棋盘
export const SIDE = Math.min(window.innerWidth, window.innerHeight) * 0.9; // 边长
export const GAP = SIDE / LINE_COUNT; // 棋盘线间距
export const START = [
  (window.innerWidth - SIDE) / 2,
  (window.innerHeight - SIDE) / 2,
];

const AllPoints: Point[][] = [];

for (let i = 0; i <= LINE_COUNT; i++) {
  let yPoints: Point[] = [];
  for (let j = 0; j <= LINE_COUNT; j++) {
    yPoints.push([START[0] + i * GAP, START[1] + j * GAP]);
  }
  AllPoints.push(yPoints);
}

console.log(AllPoints);

export const findPoint = (point: Point) => {
  const x = Math.ceil((point[0] - START[0]) / GAP - 0.5);
  const y = Math.ceil((point[1] - START[1]) / GAP - 0.5);

  if (x < 0 || x > LINE_COUNT || y < 0 || y > LINE_COUNT) return null;

  return AllPoints[x][y];
};
