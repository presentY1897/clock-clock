import getCellsOnLine from "./getCellsOnLine";

export type Angle = {
  hourAngle: number;
  minuteAngle: number;
};

export type Vertex = {
  col: number;
  row: number;
};

export type Line = {
  from: Vertex;
  to: Vertex;
};

export const E = { hourAngle: 225, minuteAngle: 225 };
export const V = { hourAngle: 0, minuteAngle: 180 };
export const H = { hourAngle: 90, minuteAngle: 270 };
export const L1 = { hourAngle: 0, minuteAngle: 90 };
export const L2 = { hourAngle: 90, minuteAngle: 180 };
export const L3 = { hourAngle: 180, minuteAngle: 270 };
export const L4 = { hourAngle: 270, minuteAngle: 0 };


export const createAnglesFromVertexPaths = (maxCol: number, maxRow: number, paths: Vertex[][]): Angle[] => {
  const lines = paths.flatMap(vertexPath => getLinesFromVertex(vertexPath));
  const initialAngles = [...Array(maxCol * maxRow)].map((_, index) => ({
    usedCount: 0,
    col: index % maxCol,
    row: Math.floor(index / maxCol),
    angle: E,
  }));
  return adjustClockByLines(initialAngles, lines);
};

type AngleElement = {
  usedCount: number;
  col: number;
  row: number;
  angle: Angle;
};

const adjustClockByLines = (angles: AngleElement[], lines: Line[]): Angle[] => {
  for (const line of lines) {
    adjustClockLine(angles, line.from, line.to);
  }
  return angles.map(element => element.angle);
};

const adjustClockLine = (angles: AngleElement[], fromPoint: Vertex, toPoint: Vertex) => {
  const points = getCellsOnLine({ x: fromPoint.col, y: fromPoint.row }, { x: toPoint.col, y: toPoint.row });
  for (let i = 0; i < points.length - 1; i++) {
    const from = points[i];
    const to = points[i + 1];
    const fromAngleElement = angles.find(angle => angle.col === from.x && angle.row === from.y);
    const toAngleElement = angles.find(angle => angle.col === to.x && angle.row === to.y);
    if (fromAngleElement && toAngleElement) {
      adjustAdjacentClock(fromAngleElement, toAngleElement);
    }
  }
};

const adjustAdjacentClock = (fromAngle: AngleElement, toAngle: AngleElement) => {
  const fromAdjust = getAdjacentClockAngles(fromAngle, toAngle);
  const toAdjust = getAdjacentClockAngles(toAngle, fromAngle);
  applyAdjustAngle(fromAngle, fromAdjust);
  applyAdjustAngle(toAngle, toAdjust);
};

const applyAdjustAngle = (element: AngleElement, adjustAngle: number) => {
  if (element.usedCount === 0) {
    element.angle = { hourAngle: adjustAngle, minuteAngle: adjustAngle };
  } else if (element.usedCount % 2 === 1) { // Changed to odd for hour hand
    element.angle.hourAngle = adjustAngle;
  } else { // Even for minute hand
    element.angle.minuteAngle = adjustAngle;
  }
  element.usedCount += 1;
};

const getAdjacentClockAngles = (fromAngle: AngleElement, toAngle: AngleElement) => {
  const dx = toAngle.col - fromAngle.col;
  const dy = toAngle.row - fromAngle.row;

  if (dx === 1 && dy === 0) return 90;   // Right
  if (dx === -1 && dy === 0) return 270; // Left
  if (dx === 0 && dy === 1) return 180;  // Down
  if (dx === 0 && dy === -1) return 0;   // Up
  if (dx === 1 && dy === -1) return 45;  // Up-Right
  if (dx === -1 && dy === -1) return 315; // Up-Left
  if (dx === 1 && dy === 1) return 135;  // Down-Right
  if (dx === -1 && dy === 1) return 225; // Down-Left

  return 225; // Default (E)
};


const getLinesFromVertex = (vertex: Vertex[]): Line[] => {
  const lines: Line[] = [];
  for (let i = 0; i < vertex.length - 1; i++) {
    lines.push({
      from: vertex[i],
      to: vertex[i + 1],
    });
  }
  return lines;
};