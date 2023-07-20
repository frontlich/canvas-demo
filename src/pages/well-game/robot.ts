type Line = [number, number, number];
type Lines = Line[];
type Steps = number[];

const allLines: Lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/** 当将会和棋时，获取剩余的位置 */
function findRest(steps: Steps) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8].find((n) => !steps.includes(n));
}

/** 发现危险位置，并占领 */
function findDanger(steps: Steps, lines: Lines) {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const rest = line.filter((p) => !steps.includes(p));
    if (rest.length === 1) return rest[0];
  }
  return null;
}

/** 获取有可能赢的位置 */
function findExpect(lines: Lines) {
  return lines[0]?.[0];
}

/** 获取第一步 */
function getFirst(step: number): [Steps, Lines, Lines] {
  const myStep = step === 4 ? 0 : 4;
  return [
    [step, myStep],
    allLines.filter((line) => !line.includes(myStep)),
    allLines.filter((line) => !line.includes(step)),
  ];
}

function getNext(
  steps: Steps,
  dangerLines: Lines,
  expectedLines: Lines = dangerLines
): [Steps, Lines, Lines] {
  if (steps.length === 1) {
    return getFirst(steps[0]);
  }
  const rivalSteps = steps.filter((_, i) => i % 2 === 0);
  const restExpected = expectedLines.filter(
    (line) => !line.includes(rivalSteps[rivalSteps.length - 1])
  );

  const winStep = findDanger(
    steps.filter((_, i) => i % 2 === 1),
    expectedLines
  );

  const myStep =
    winStep !== null && !steps.includes(winStep)
      ? winStep
      : findDanger(rivalSteps, dangerLines) ??
        findExpect(restExpected) ??
        findRest(steps);
  return [
    [...steps, myStep],
    dangerLines.filter((line) => !line.includes(myStep)),
    restExpected,
  ];
}

class Robot {
  steps: Steps = [];
  dangerLines = allLines;
  expectedLines = allLines;

  next(step: number) {
    const [steps, dangerLines, expectedLines] = getNext(
      [...this.steps, step],
      this.dangerLines,
      this.expectedLines
    );
    this.steps = steps;
    this.dangerLines = dangerLines;
    this.expectedLines = expectedLines;
    return steps[steps.length - 1];
  }

  restart() {
    this.steps = [];
    this.dangerLines = allLines;
    this.expectedLines = allLines;
  }
}

export const robot = new Robot();
