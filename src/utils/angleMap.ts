
const E = { hourAngle: 0, minuteAngle: 0 };
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

const getNormalAngles = (maxCol: number, maxRow: number, char: string) => {
  const angles = [];

  switch (char) {
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
      angles.push(L4);
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
      angles.push(L1);
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
  }
  return angles;
};

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
