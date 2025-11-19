import getCellsOnLine from "./getCellsOnLine";

type Angle = {
  hourAngle: number;
  minuteAngle: number;
};

const E = { hourAngle: 225, minuteAngle: 225 };
const V = { hourAngle: 0, minuteAngle: 180 };
const H = { hourAngle: 90, minuteAngle: 270 };
const L1 = { hourAngle: 0, minuteAngle: 90 };
const L2 = { hourAngle: 90, minuteAngle: 180 };
const L3 = { hourAngle: 180, minuteAngle: 270 };
const L4 = { hourAngle: 270, minuteAngle: 0 };

const NORMAL_ANGLE_MIN_COL = 4;
const NORMAL_ANGLE_MIN_ROW = 6;

type Vertex = {
  col: number;
  row: number;
};

type Line = {
  from: Vertex;
  to: Vertex;
};

const UPPER_LINE = (maxCol: number) => [
  L2,
  ...Array(maxCol - 2).fill(H),
  L3,
];

const LOWER_LINE = (maxCol: number) => [
  L1,
  ...Array(maxCol - 2).fill(H),
  L4,
];

const createAnglesFromVertexPaths = (maxCol: number, maxRow: number, paths: Vertex[][]): Angle[] => {
  const lines = paths.flatMap(vertexPath => getLinesFromVertex(vertexPath));
  const initialAngles = [...Array(maxCol * maxRow)].map((_, index) => ({
    usedCount: 0,
    col: index % maxCol,
    row: Math.floor(index / maxCol),
    angle: E,
  }));
  return adjustClockByLines(initialAngles, lines);
};

const CHAR_DEFINITIONS: {
  [key: string]: {
    minimum: (maxCol: number, maxRow: number) => Angle[];
    normal: (maxCol: number, maxRow: number) => Angle[];
  }
} = {
  '0': {
    minimum: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
      [
        { col: 0, row: 0 },
        { col: maxCol - 1, row: 0 },
        { col: maxCol - 1, row: maxRow - 1 },
        { col: 0, row: maxRow - 1 },
        { col: 0, row: 0 },
      ],
    ]),
    normal: (maxCol, maxRow) => {
      const angles = [];
      angles.push(...UPPER_LINE(maxCol));
      angles.push(V, L2, ...Array(maxCol - 4).fill(H), L3, V);
      for (let i = 0; i < maxRow - 4; i++) {
        angles.push(V, V, ...Array(maxCol - 4).fill(E), V, V);
      }
      angles.push(V, L1, ...Array(maxCol - 4).fill(H), L4, V);
      angles.push(...LOWER_LINE(maxCol));
      return angles;
    },
  },
  '1': {
    minimum: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
      [
        { col: maxCol - 1, row: 0 },
        { col: maxCol - 1, row: maxRow - 1 },
      ],
    ]),
    normal: (maxCol, maxRow) => {
      const angles = [];
      angles.push(...Array(maxCol - 2).fill(E), L2, L3);
      for (let i = 0; i < maxRow - 2; i++) {
        angles.push(...Array(maxCol - 2).fill(E), V, V);
      }
      angles.push(...Array(maxCol - 2).fill(E), L1, L4);
      return angles;
    },
  },
  '2': {
    minimum: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
      [
        { col: 0, row: 0 },
        { col: maxCol - 1, row: 0 },
        { col: maxCol - 1, row: Math.floor(maxRow / 2) },
        { col: 0, row: Math.floor(maxRow / 2) },
        { col: 0, row: maxRow - 1 },
        { col: maxCol - 1, row: maxRow - 1 },
      ],
    ]),
    normal: (maxCol, maxRow) => {
      const angles = [];
      angles.push(...UPPER_LINE(maxCol));
      angles.push(L1, ...Array(maxCol - 3).fill(H), L3, V);
      for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
        angles.push(...Array(maxCol - 2).fill(E), V, V);
      }
      angles.push(L2, ...Array(maxCol - 3).fill(H), L4, V);
      angles.push(V, L2, ...Array(maxCol - 3).fill(H), L4);
      for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
        angles.push(V, V, ...Array(maxCol - 2).fill(E));
      }
      angles.push(V, L1, ...Array(maxCol - 3).fill(H), L3);
      angles.push(...LOWER_LINE(maxCol));
      return angles;
    },
  },
  '3': {
    minimum: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
      [
        { col: 0, row: 0 },
        { col: maxCol - 1, row: 0 },
        { col: maxCol - 1, row: Math.floor(maxRow / 2) },
        { col: 0, row: Math.floor(maxRow / 2) },
      ],
      [
        { col: maxCol - 1, row: Math.floor(maxRow / 2) },
        { col: maxCol - 1, row: maxRow - 1 },
        { col: 0, row: maxRow - 1 },
      ],
    ]),
    normal: (maxCol, maxRow) => {
      const angles = [];
      angles.push(...UPPER_LINE(maxCol));
      angles.push(L1, ...Array(maxCol - 3).fill(H), L3, V);
      for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
        angles.push(...Array(maxCol - 2).fill(E), V, V);
      }
      angles.push(L2, ...Array(maxCol - 3).fill(H), L4, V);
      angles.push(L1, ...Array(maxCol - 3).fill(H), L3, V);
      for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
        angles.push(...Array(maxCol - 2).fill(E), V, V);
      }
      angles.push(L2, ...Array(maxCol - 3).fill(H), L4, V);
      angles.push(...LOWER_LINE(maxCol));
      return angles;
    },
  },
  '4': {
    minimum: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
      [
        { col: 0, row: 0 },
        { col: 0, row: Math.floor(maxRow / 2) },
        { col: maxCol - 1, row: Math.floor(maxRow / 2) },
      ],
      [
        { col: maxCol - 1, row: 0 },
        { col: maxCol - 1, row: maxRow - 1 },
      ],
    ]),
    normal: (maxCol, maxRow) => {
      const angles = [];
      angles.push(L2, L3, ...Array(maxCol - 4).fill(E), L2, L3);
      for (let i = 0; i < Math.floor((maxRow - 4) / 2); i++) {
        angles.push(V, V, ...Array(maxCol - 4).fill(E), V, V);
      }
      angles.push(V, L1, ...Array(maxCol - 4).fill(H), L4, V);
      angles.push(L1, ...Array(maxCol - 3).fill(H), L3, V);
      for (let i = 0; i < Math.ceil((maxRow - 4) / 2); i++) {
        angles.push(...Array(maxCol - 2).fill(E), V, V);
      }
      angles.push(...Array(maxCol - 2).fill(E), L1, L4);
      return angles;
    },
  },
  '5': {
    minimum: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
      [
        { col: maxCol - 1, row: 0 },
        { col: 0, row: 0 },
        { col: 0, row: Math.floor(maxRow / 2) },
        { col: maxCol - 1, row: Math.floor(maxRow / 2) },
        { col: maxCol - 1, row: maxRow - 1 },
        { col: 0, row: maxRow - 1 },
      ],
    ]),
    normal: (maxCol, maxRow) => {
      const angles = [];
      angles.push(...UPPER_LINE(maxCol));
      angles.push(V, L2, ...Array(maxCol - 3).fill(H), L4);
      for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
        angles.push(V, V, ...Array(maxCol - 2).fill(E));
      }
      angles.push(V, L1, ...Array(maxCol - 3).fill(H), L3);
      angles.push(L1, ...Array(maxCol - 3).fill(H), L3, V);
      for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
        angles.push(...Array(maxCol - 2).fill(E), V, V);
      }
      angles.push(L2, ...Array(maxCol - 3).fill(H), L4, V);
      angles.push(...LOWER_LINE(maxCol));
      return angles;
    },
  },
  '6': {
    minimum: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
      [
        { col: maxCol - 1, row: 0 },
        { col: 0, row: 0 },
        { col: 0, row: maxRow - 1 },
      ],
      [
        { col: 0, row: Math.floor(maxRow / 2) },
        { col: maxCol - 1, row: Math.floor(maxRow / 2) },
        { col: maxCol - 1, row: maxRow - 1 },
        { col: 0, row: maxRow - 1 },
        { col: 0, row: Math.floor(maxRow / 2) },
      ],
    ]),
    normal: (maxCol, maxRow) => {
      const angles = [];
      angles.push(...UPPER_LINE(maxCol));
      angles.push(V, L2, ...Array(maxCol - 3).fill(H), L4);
      for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
        angles.push(V, V, ...Array(maxCol - 2).fill(E));
      }
      angles.push(V, L1, ...Array(maxCol - 3).fill(H), L3);
      angles.push(V, L2, ...Array(maxCol - 4).fill(H), L3, V);
      for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
        angles.push(V, V, ...Array(maxCol - 4).fill(E), V, V);
      }
      angles.push(V, L1, ...Array(maxCol - 4).fill(H), L4, V);
      angles.push(...LOWER_LINE(maxCol));
      return angles;
    },
  },
  '7': {
    minimum: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
      [
        { col: 0, row: 0 },
        { col: maxCol - 1, row: 0 },
        { col: maxCol - 1, row: maxRow - 1 },
      ],
    ]),
    normal: (maxCol, maxRow) => {
      const angles = [];
      angles.push(...UPPER_LINE(maxCol));
      angles.push(L1, ...Array(maxCol - 3).fill(H), L3, V);
      for (let i = 0; i < maxRow - 3; i++) {
        angles.push(...Array(maxCol - 2).fill(E), V, V);
      }
      angles.push(...Array(maxCol - 2).fill(E), L1, L4);
      return angles;
    },
  },
  '8': {
    minimum: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
      [
        { col: 0, row: 0 },
        { col: maxCol - 1, row: 0 },
        { col: maxCol - 1, row: Math.floor(maxRow / 2) },
        { col: 0, row: Math.floor(maxRow / 2) },
        { col: 0, row: 0 },
      ],
      [
        { col: 0, row: Math.floor(maxRow / 2) },
        { col: maxCol - 1, row: Math.floor(maxRow / 2) },
        { col: maxCol - 1, row: maxRow - 1 },
        { col: 0, row: maxRow - 1 },
        { col: 0, row: Math.floor(maxRow / 2) },
      ],
    ]),
    normal: (maxCol, maxRow) => {
      const angles = [];
      angles.push(...UPPER_LINE(maxCol));
      angles.push(V, L2, ...Array(maxCol - 4).fill(H), L3, V);
      for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
        angles.push(V, V, ...Array(maxCol - 4).fill(E), V, V);
      }
      angles.push(V, L1, ...Array(maxCol - 4).fill(H), L4, V);
      angles.push(V, L2, ...Array(maxCol - 4).fill(H), L3, V);
      for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
        angles.push(V, V, ...Array(maxCol - 4).fill(E), V, V);
      }
      angles.push(V, L1, ...Array(maxCol - 4).fill(H), L4, V);
      angles.push(...LOWER_LINE(maxCol));
      return angles;
    },
  },
  '9': {
    minimum: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
      [
        { col: 0, row: 0 },
        { col: maxCol - 1, row: 0 },
        { col: maxCol - 1, row: Math.floor(maxRow / 2) },
        { col: 0, row: Math.floor(maxRow / 2) },
        { col: 0, row: 0 },
      ],
      [
        { col: 0, row: Math.floor(maxRow / 2) },
        { col: maxCol - 1, row: Math.floor(maxRow / 2) },
        { col: maxCol - 1, row: maxRow - 1 },
        { col: 0, row: maxRow - 1 },
      ],
    ]),
    normal: (maxCol, maxRow) => {
      const angles = [];
      angles.push(...UPPER_LINE(maxCol));
      angles.push(V, L2, ...Array(maxCol - 4).fill(H), L3, V);
      for (let i = 0; i < Math.floor((maxRow - 6) / 2); i++) {
        angles.push(V, V, ...Array(maxCol - 4).fill(E), V, V);
      }
      angles.push(V, L1, ...Array(maxCol - 4).fill(H), L4, V);
      angles.push(L1, ...Array(maxCol - 3).fill(H), L3, V);
      for (let i = 0; i < Math.ceil((maxRow - 6) / 2); i++) {
        angles.push(...Array(maxCol - 2).fill(E), V, V);
      }
      angles.push(L2, ...Array(maxCol - 3).fill(H), L4, V);
      angles.push(...LOWER_LINE(maxCol));
      return angles;
    },
  },
  'c': {
    minimum: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
      [
        { col: maxCol - 1, row: 0 },
        { col: 0, row: 0 },
        { col: 0, row: maxRow - 1 },
        { col: maxCol - 1, row: maxRow - 1 },
      ],
    ]),
    normal: (maxCol, maxRow) => {
      const angles = [];
      angles.push(...UPPER_LINE(maxCol));
      angles.push(V, L2, ...Array(maxCol - 3).fill(H), L4);
      for (let i = 0; i < maxRow - 4; i++) {
        angles.push(V, V, ...Array(maxCol - 2).fill(E));
      }
      angles.push(V, L1, ...Array(maxCol - 3).fill(H), L3);
      angles.push(...LOWER_LINE(maxCol));
      return angles;
    },
  },
  'l': {
    minimum: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
      [
        { col: 0, row: 0 },
        { col: 0, row: maxRow - 1 },
        { col: maxCol - 1, row: maxRow - 1 },
      ],
    ]),
    normal: (maxCol, maxRow) => {
      const angles = [];
      angles.push(L2, L3, ...Array(maxCol - 2).fill(E));
      for (let i = 0; i < maxRow - 3; i++) {
        angles.push(V, V, ...Array(maxCol - 2).fill(E));
      }
      angles.push(V, L1, ...Array(maxCol - 3).fill(H), L3);
      angles.push(...LOWER_LINE(maxCol));
      return angles;
    },
  },
  'k': {
    minimum: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
      [
        { col: 0, row: 0 },
        { col: 0, row: maxRow - 1 },
      ],
      [
        { col: maxCol - 1, row: 0 },
        { col: 0, row: Math.floor(maxRow / 2) },
        { col: maxCol - 1, row: maxRow - 1 },
      ],
    ]),
    normal: (maxCol, maxRow) => createAnglesFromVertexPaths(maxCol, maxRow, [
      [
        { col: 0, row: 0 },
        { col: 1, row: 0 },
        { col: 1, row: Math.max(Math.floor((maxRow - 4) / 2), 1) },
        { col: maxCol - 1, row: 0 },
        { col: 1, row: Math.max(Math.floor((maxRow - 4) / 2), 1) + 1 },
        { col: maxCol - 1, row: maxRow - 2 },
        { col: maxCol - 1, row: maxRow - 1 },
        { col: 1, row: Math.max(Math.floor((maxRow - 4) / 2), 1) + 2 },
        { col: 1, row: maxRow - 1 },
        { col: 0, row: maxRow - 1 },
        { col: 0, row: 0 },
      ]
    ]),
  },
  ':': {
    minimum: (maxCol, maxRow) => [...Array(maxCol * maxRow)].map(() => E),
    normal: (maxCol, maxRow) => {
      const angles = [];
      const emptyTopBottomRows = Math.floor((maxRow - 5) / 2);
      const emptyMidRowColsLeft = Math.ceil((maxCol - 2) / 2);
      const emptyMidRowColsRight = Math.floor((maxCol - 2) / 2);

      angles.push(...Array(emptyTopBottomRows * maxCol).fill(E));
      angles.push(...Array(emptyMidRowColsLeft).fill(E), L2, L3, ...Array(emptyMidRowColsRight).fill(E));
      angles.push(...Array(emptyMidRowColsLeft).fill(E), L1, L4, ...Array(emptyMidRowColsRight).fill(E));
      angles.push(...Array(maxCol).fill(E));
      angles.push(...Array(emptyMidRowColsLeft).fill(E), L2, L3, ...Array(emptyMidRowColsRight).fill(E));
      angles.push(...Array(emptyMidRowColsLeft).fill(E), L1, L4, ...Array(emptyMidRowColsRight).fill(E));
      angles.push(...Array(emptyTopBottomRows * maxCol).fill(E));
      return angles;
    },
  },
};
// Aliases
CHAR_DEFINITIONS['o'] = CHAR_DEFINITIONS['0'];

export const getAngles = (maxCol: number, maxRow: number, char: string): Angle[] => {
  const charKey = char.toLowerCase();
  const definition = CHAR_DEFINITIONS[charKey];

  if (!definition) {
    return [...Array(maxCol * maxRow)].map(() => E);
  }

  const isMinimumMode = maxCol < NORMAL_ANGLE_MIN_COL || maxRow < NORMAL_ANGLE_MIN_ROW;
  const angleGenerator = isMinimumMode ? definition.minimum : definition.normal;

  return angleGenerator(maxCol, maxRow);
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
};

const getAdjacentClockAngles = (fromAngle: AngleElement, toAngle: AngleElement) => {
  const colAngleAdded = toAngle.col - fromAngle.col === -1 ? 270 : 90;
  const colAngleMultiplier = toAngle.col - fromAngle.col === 0 ? 90 : 45 * (toAngle.col - fromAngle.col);
  return colAngleAdded + (colAngleMultiplier * (toAngle.row - fromAngle.row));
};

const applyAdjustAngle = (element: AngleElement, adjustAngle: number) => {
  if (element.usedCount === 0) {
    element.angle = {
      hourAngle: adjustAngle,
      minuteAngle: adjustAngle,
    };
  } else if (element.usedCount % 2 === 0) {
    element.angle.hourAngle = adjustAngle;
  } else {
    element.angle.minuteAngle = adjustAngle;
  }
  element.usedCount += 1;
};

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
};

const adjustClockByLines = (angles: AngleElement[], lines: Line[]): Angle[] => {
  for (const line of lines) {
    adjustClockLine(angles, line.from, line.to);
  }
  return angles.map(element => element.angle);
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
