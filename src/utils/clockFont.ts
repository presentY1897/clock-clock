import { CHAR_DEFINITIONS } from "./charDefinitions";
import { type Angle, E } from "./clockAngleUtils";

const NORMAL_ANGLE_MIN_COL = 4;
const NORMAL_ANGLE_MIN_ROW = 6;

/**
 * Generates an array of angles to represent a given character on a grid of clocks.
 *
 * @param maxCol - The number of columns in the clock grid.
 * @param maxRow - The number of rows in the clock grid.
 * @param char - The character to display.
 * @returns An array of Angle objects.
 */
export const generateClockCharacter = (maxCol: number, maxRow: number, char: string): Angle[] => {
  const charKey = char.toLowerCase();
  const definition = CHAR_DEFINITIONS[charKey];

  if (!definition) {
    return [...Array(maxCol * maxRow)].map(() => E);
  }

  const isMinimumMode = maxCol < NORMAL_ANGLE_MIN_COL || maxRow < NORMAL_ANGLE_MIN_ROW;
  const angleGenerator = isMinimumMode ? definition.small : definition.normal;

  return angleGenerator(maxCol, maxRow);
};

/**
 * Pivots the angle map for display purposes.
 * (This function seems to be for transforming the coordinate system, e.g., for rotation)
 *
 * @param maxCol - The number of columns in the clock grid.
 * @param maxRow - The number of rows in the clock grid.
 * @param angles - The array of angles to pivot.
 * @returns A new, pivoted array of angles.
 */
export const pivotAngles = (maxCol: number, maxRow: number, angles: Angle[]): Angle[] => {
  const pivoted: Angle[] = [];
  for (let col = 0; col < maxCol; col++) {
    for (let row = maxRow - 1; row >= 0; row--) {
      const index = row * maxCol + col;
      const angle = angles[index];
      if (angle) {
        pivoted.push({
          hourAngle: angle.hourAngle + 90,
          minuteAngle: angle.minuteAngle + 90,
        });
      }
    }
  }
  return pivoted;
};