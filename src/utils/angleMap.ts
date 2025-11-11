import getCellsOnLine from "./getCellsOnLine";

type Angle = {
  hourAngle: number;
  minuteAngle: number;
}

const E = { hourAngle: 225, minuteAngle: 225 };
const V = { hourAngle: 0, minuteAngle: 180 };
const H = { hourAngle: 90, minuteAngle: 270 };
const L1 = { hourAngle: 0, minuteAngle: 90 };
const L2 = { hourAngle: 90, minuteAngle: 180 };
const L3 = { hourAngle: 180, minuteAngle: 270 };
const L4 = { hourAngle: 270, minuteAngle: 0 };

const NORMAL_ANGLE_MIN_COL = 4;
const NORMAL_ANGLE_MIN_ROW = 6;


export const getAngles = (maxCol: number, maxRow: number, char: string) => {
  if (maxCol < NORMAL_ANGLE_MIN_COL || maxRow < NORMAL_ANGLE_MIN_ROW) {
    return [];
  } else {
    return getNormalAngles(maxCol, maxRow, char);
  }
}

const UPPER_LINE = (maxCol: number) => {
  const angles = [];
  angles.push(L2);
  angles.push(...[...Array(maxCol - 2)].map(() => H));
  angles.push(L3);
  return angles;
};

const LOWER_LINE = (maxCol: number) => {
  const angles = [];

  angles.push(L1);
  angles.push(...[...Array(maxCol - 2)].map(() => H));
  angles.push(L4);
  return angles;
};

export const pivotAngles = (maxCol: number, maxRow: number, angles: Angle[]) => {
  const pivotAngles = [];

  for (let col = 0; col < maxCol; col++) {
    for (let row = maxRow - 1; row >= 0; row--) {
      const index = row * maxCol + col;
      if (angles[index]) {
        pivotAngles.push({
          hourAngle: angles[index].hourAngle + 90,
          minuteAngle: angles[index].minuteAngle + 90,
        });
      }
    }
  }
  return pivotAngles;

}

const getNormalAngles = (maxCol: number, maxRow: number, char: string) => {
  const angles = [];

  switch (char) {
    case 'O':
    case 'o':
    case "0":
      angles.push(...UPPER_LINE(maxCol));
      angles.push(...[V, L2]);
      angles.push(...[...Array(maxCol - 4)].map(() => H));
      angles.push(...[L3, V]);
      for (let i = 0; i < maxRow - 4; i++) {
        angles.push(V);
        angles.push(V);
        angles.push(...[...Array(maxCol - 4)].map(() => E));
        angles.push(V);
        angles.push(V);
      }
      angles.push(...[V, L1]);
      angles.push(...[...Array(maxCol - 4)].map(() => H));
      angles.push(...[L4, V]);
      angles.push(...LOWER_LINE(maxCol));
      break;
    case "1":
      angles.push(...[...Array(maxCol - 2)].map(() => E));
      angles.push(L2);
      angles.push(L3);

      for (let i = 0; i < maxRow - 2; i++) {
        angles.push(...[...Array(maxCol - 2)].map(() => E));
        angles.push(V);
        angles.push(V);
      }
      angles.push(...[...Array(maxCol - 2)].map(() => E));
      angles.push(L1);
      angles.push(L4);
      break;
    case "2":
      angles.push(...UPPER_LINE(maxCol));

      angles.push(L1);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L3);
      angles.push(V);

      for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
        angles.push(...[...Array(maxCol - 2)].map(() => E));
        angles.push(V);
        angles.push(V);
      }

      angles.push(L2);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L4);
      angles.push(V);

      angles.push(V);
      angles.push(L2);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L4);

      for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
        angles.push(V);
        angles.push(V);
        angles.push(...[...Array(maxCol - 2)].map(() => E));
      }

      angles.push(V);
      angles.push(L1);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L3);

      angles.push(...LOWER_LINE(maxCol));
      break;
    case "3":
      angles.push(...UPPER_LINE(maxCol));

      angles.push(L1);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L3);
      angles.push(V);

      for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
        angles.push(...[...Array(maxCol - 2)].map(() => E));
        angles.push(V);
        angles.push(V);
      }

      angles.push(L2);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L4);
      angles.push(V);

      angles.push(L1);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L3);
      angles.push(V);

      for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
        angles.push(...[...Array(maxCol - 2)].map(() => E));
        angles.push(V);
        angles.push(V);
      }

      angles.push(L2);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L4);
      angles.push(V);

      angles.push(...LOWER_LINE(maxCol));
      break;
    case "4":
      angles.push(L2);
      angles.push(L3);
      angles.push(...[...Array(maxCol - 4)].map(() => E));
      angles.push(L2);
      angles.push(L3);

      for (let i = 0; i < Math.floor((maxRow - 4) / 2); i++) {
        angles.push(V);
        angles.push(V);
        angles.push(...[...Array(maxCol - 4)].map(() => E));
        angles.push(V);
        angles.push(V);
      }

      angles.push(V);
      angles.push(L1);
      angles.push(...[...Array(maxCol - 4)].map(() => H));
      angles.push(L4);
      angles.push(V);

      angles.push(L1);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L3);
      angles.push(V);

      for (let i = 0; i < Math.ceil((maxRow - 4) / 2); i++) {
        angles.push(...[...Array(maxCol - 2)].map(() => E));
        angles.push(V);
        angles.push(V);
      }

      angles.push(...[...Array(maxCol - 2)].map(() => E));
      angles.push(L1);
      angles.push(L4);
      break;
    case "5":
      angles.push(...UPPER_LINE(maxCol));

      angles.push(V);
      angles.push(L2);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L4);

      for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
        angles.push(V);
        angles.push(V);
        angles.push(...[...Array(maxCol - 2)].map(() => E));
      }

      angles.push(V);
      angles.push(L1);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L3);

      angles.push(L1);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L3);
      angles.push(V);

      for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
        angles.push(...[...Array(maxCol - 2)].map(() => E));
        angles.push(V);
        angles.push(V);
      }

      angles.push(L2);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L4);
      angles.push(V);

      angles.push(...LOWER_LINE(maxCol));
      break;
    case "6":
      angles.push(...UPPER_LINE(maxCol));

      angles.push(V);
      angles.push(L2);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L4);

      for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
        angles.push(V);
        angles.push(V);
        angles.push(...[...Array(maxCol - 2)].map(() => E));
      }

      angles.push(V);
      angles.push(L1);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L3);

      angles.push(V);
      angles.push(L2);
      angles.push(...[...Array(maxCol - 4)].map(() => H));
      angles.push(L3);
      angles.push(V);

      for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
        angles.push(V);
        angles.push(V);
        angles.push(...[...Array(maxCol - 4)].map(() => E));
        angles.push(V);
        angles.push(V);
      }

      angles.push(V);
      angles.push(L1);
      angles.push(...[...Array(maxCol - 4)].map(() => H));
      angles.push(L4);
      angles.push(V);

      angles.push(...LOWER_LINE(maxCol));
      break;
    case "7":
      angles.push(...UPPER_LINE(maxCol));

      angles.push(L1);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L3);
      angles.push(V);

      for (let i = 0; i < maxRow - 3; i++) {
        angles.push(...[...Array(maxCol - 2)].map(() => E));
        angles.push(V);
        angles.push(V);
      }

      angles.push(...[...Array(maxCol - 2)].map(() => E));
      angles.push(L1);
      angles.push(L4);
      break;
    case "8":
      angles.push(...UPPER_LINE(maxCol));

      angles.push(V);
      angles.push(L2);
      angles.push(...[...Array(maxCol - 4)].map(() => H));
      angles.push(L3);
      angles.push(V);

      for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
        angles.push(V);
        angles.push(V);
        angles.push(...[...Array(maxCol - 4)].map(() => E));
        angles.push(V);
        angles.push(V);
      }

      angles.push(V);
      angles.push(L1);
      angles.push(...[...Array(maxCol - 4)].map(() => H));
      angles.push(L4);
      angles.push(V);

      angles.push(V);
      angles.push(L2);
      angles.push(...[...Array(maxCol - 4)].map(() => H));
      angles.push(L3);
      angles.push(V);

      for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
        angles.push(V);
        angles.push(V);
        angles.push(...[...Array(maxCol - 4)].map(() => E));
        angles.push(V);
        angles.push(V);
      }

      angles.push(V);
      angles.push(L1);
      angles.push(...[...Array(maxCol - 4)].map(() => H));
      angles.push(L4);
      angles.push(V);

      angles.push(...LOWER_LINE(maxCol));
      break;
    case "9":
      angles.push(...UPPER_LINE(maxCol));

      angles.push(V);
      angles.push(L2);
      angles.push(...[...Array(maxCol - 4)].map(() => H));
      angles.push(L3);
      angles.push(V);

      for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
        angles.push(V);
        angles.push(V);
        angles.push(...[...Array(maxCol - 4)].map(() => E));
        angles.push(V);
        angles.push(V);
      }

      angles.push(V);
      angles.push(L1);
      angles.push(...[...Array(maxCol - 4)].map(() => H));
      angles.push(L4);
      angles.push(V);

      angles.push(L1);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L3);
      angles.push(V);

      for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
        angles.push(...[...Array(maxCol - 2)].map(() => E));
        angles.push(V);
        angles.push(V);
      }

      angles.push(L2);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L4);
      angles.push(V);

      angles.push(...LOWER_LINE(maxCol));
      break;

    case ":":
      angles.push(
        ...[...Array(Math.ceil((maxRow - 5) / 2) * maxCol)].map(() => E)
      );

      angles.push(...[...Array(Math.ceil((maxCol - 2) / 2))].map(() => E));
      angles.push(L2);
      angles.push(L3);
      angles.push(...[...Array(Math.floor((maxCol - 2) / 2))].map(() => E));

      angles.push(...[...Array(Math.ceil((maxCol - 2) / 2))].map(() => E));
      angles.push(L1);
      angles.push(L4);
      angles.push(...[...Array(Math.floor((maxCol - 2) / 2))].map(() => E));

      angles.push(...[...Array(maxCol)].map(() => E));

      angles.push(...[...Array(Math.ceil((maxCol - 2) / 2))].map(() => E));
      angles.push(L2);
      angles.push(L3);
      angles.push(...[...Array(Math.floor((maxCol - 2) / 2))].map(() => E));

      angles.push(...[...Array(Math.ceil((maxCol - 2) / 2))].map(() => E));
      angles.push(L1);
      angles.push(L4);
      angles.push(...[...Array(Math.floor((maxCol - 2) / 2))].map(() => E));

      angles.push(
        ...[...Array(Math.floor((maxRow - 5) / 2) * maxCol)].map(() => E)
      );

      break;
    case 'C':
    case 'c':
      angles.push(...UPPER_LINE(maxCol));

      angles.push(V);
      angles.push(L2);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L4);

      for (let i = 0; i < maxRow - 4; i++) {
        angles.push(V);
        angles.push(V);
        angles.push(...[...Array(maxCol - 2)].map(() => E));
      }

      angles.push(V);
      angles.push(L1);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L3);

      angles.push(...LOWER_LINE(maxCol));
      break;
    case 'L':
    case 'l':
      angles.push(L2);
      angles.push(L3);
      angles.push(...[...Array(maxCol - 2)].map(() => E));

      for (let i = 0; i < maxRow - 3; i++) {
        angles.push(V);
        angles.push(V);
        angles.push(...[...Array(maxCol - 2)].map(() => E));
      }

      angles.push(V);
      angles.push(L1);
      angles.push(...[...Array(maxCol - 3)].map(() => H));
      angles.push(L3);

      angles.push(...LOWER_LINE(maxCol));
      break;
    case 'K':
    case 'k':
      angles.push(...adjustClockByLines([...Array(maxCol * maxRow)].map(() => E).map((angle, index) => ({
        usedCount: 0,
        col: index % maxCol,
        row: Math.floor(index / maxCol),
        angle: angle,
      })),
        getLinesFromVertex([
          { col: 0, row: 0 },
          { col: 1, row: 0 },
          { col: 1, row: Math.max(Math.floor((maxRow - 4) / 2), 1) },
          { col: maxCol - 1, row: 0 },
          // { col: maxCol - 1, row: 1 },
          { col: 1, row: Math.max(Math.floor((maxRow - 4) / 2), 1) + 1 },
          { col: maxCol - 1, row: maxRow - 2 },
          { col: maxCol - 1, row: maxRow - 1 },
          { col: 1, row: Math.max(Math.floor((maxRow - 4) / 2), 1) + 2 },
          { col: 1, row: maxRow - 1 },
          { col: 0, row: maxRow - 1 },
          { col: 0, row: 0 },
        ])));
      break;
    default:
      break;
  }
  return angles;
};

type AngleElement = {
  usedCount: number;
  col: number;
  row: number;
  angle: Angle;
};

const adjustAdjacentClock = (fromAngle: AngleElement, toAngle: AngleElement) => {
  const adjustFromAngle = getAdjacentClockAngles(fromAngle, toAngle);
  const adjustToAngle = getAdjacentClockAngles(toAngle, fromAngle);
  applyAdjustAngle(fromAngle, adjustFromAngle);
  applyAdjustAngle(toAngle, adjustToAngle);
}

const getAdjacentClockAngles = (fromAngle: AngleElement, toAngle: AngleElement) => {
  const colAngleAdded = toAngle.col - fromAngle.col === -1 ? 270 : 90;
  const colAngleMultiplier = toAngle.col - fromAngle.col === 0 ? 90 : 45 * (toAngle.col - fromAngle.col);
  return colAngleAdded + (colAngleMultiplier * (toAngle.row - fromAngle.row));
}

const applyAdjustAngle = (element: AngleElement, adjustAngle: number) => {
  const angleUsedCount = element.usedCount;

  if (angleUsedCount == 0) {
    element.angle = {
      hourAngle: adjustAngle,
      minuteAngle: adjustAngle,
    }
  } else if (angleUsedCount % 2 == 0) {
    element.angle.hourAngle = adjustAngle
  } else {
    element.angle.minuteAngle = adjustAngle;
  }
  element.usedCount += 1;
}

type Vertex = {
  col: number;
  row: number
}

const adjustClockLine = (angles: AngleElement[], fromPoint: Vertex, toPoint: Vertex) => {
  const points = getCellsOnLine({ x: fromPoint.col, y: fromPoint.row }, { x: toPoint.col, y: toPoint.row });
  for (let i = 0; i < points.length - 1; i++) {
    const fromPoint = points[i];
    const toPoint = points[i + 1];
    const _fromAngle = angles.find(angle => angle.col === fromPoint.x && angle.row === fromPoint.y);
    const _toAngle = angles.find(angle => angle.col === toPoint.x && angle.row === toPoint.y);
    if (_fromAngle && _toAngle) {
      adjustAdjacentClock(_fromAngle, _toAngle);
    }
  }
  return angles.map(element => element.angle);

}

type Line = {
  from: Vertex;
  to: Vertex;
}

const adjustClockByLines = (angles: AngleElement[], lines: Line[]) => {
  for (let i = 0; i < lines.length; i++) {
    adjustClockLine(angles, lines[i].from, lines[i].to);
  }
  return angles.map(element => element.angle);
}

const getLinesFromVertex = (vertex: Vertex[]) => {
  const lines = [];
  for (let i = 0; i < vertex.length - 1; i++) {
    lines.push({
      from: vertex[i],
      to: vertex[i + 1],
    });
  }
  return lines;
}