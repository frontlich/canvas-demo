export const getDistance = (p1: Point, p2: Point) => {
  const offsetX = Math.abs(p1[0] - p2[0]),
    offsetY = Math.abs(p1[1] - p2[1]);
  return Math.sqrt(offsetX * offsetX + offsetY * offsetY);
};