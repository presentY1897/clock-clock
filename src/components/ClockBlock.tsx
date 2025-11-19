import React, { useEffect, useState } from "react";
import "./ClockBlock.css";
import ClockFace from "./clock/ClockFace";
import { generateClockCharacter, pivotAngles } from "../utils/clockFont";

export type ModeState = "random" | "go to current time" | "waiting";

interface ClockBlockProps {
  char: string;
  col: number;
  row: number;
  clockSize?: string;
  mode?: ModeState;
  transitionDuration?: number;
  isPivot?: boolean;
}

const ClockBlock: React.FC<ClockBlockProps> = ({
  char,
  col,
  row,
  clockSize = "60px",
  mode = "random",
  transitionDuration = 30000,
  isPivot = false,
}) => {
  const [hour, setHour] = useState([...Array(col * row)].map(() => 0));
  const [minute, setMinute] = useState([...Array(col * row)].map(() => 0));

  const getRandomAddAngle = () => {
    return Math.floor(Math.random() * 180) + 180;
  };

  useEffect(() => {
    let angles = generateClockCharacter(col, row, char);
    if (angles.length === 0) return;
    if (isPivot) {
      angles = pivotAngles(col, row, angles);
    }

    switch (mode) {
      case "go to current time":
        setHour(
          angles.map(
            (angle, index) =>
              Math.ceil(hour[index] / 360) * 360 + angle.hourAngle
          )
        );
        setMinute(
          angles.map(
            (angle, index) =>
              Math.ceil(minute[index] / 360) * 360 + angle.minuteAngle
          )
        );
        break;
      case "waiting":
        break;
      case "random":
      default:
        setHour(
          [...Array(col * row)].map(
            (_, index) =>
              Math.ceil(hour[index] / 360) * 360 + getRandomAddAngle()
          )
        );
        setMinute(
          [...Array(col * row)].map(
            (_, index) =>
              Math.ceil(minute[index] / 360) * 360 + getRandomAddAngle()
          )
        );
        break;
    }
  }, [mode, isPivot, col, row, char]);

  return (
    <div
      className="clock-block-container"
      style={{
        gridTemplateColumns: `repeat(${isPivot ? row : col}, 1fr)`,
        gridTemplateRows: `repeat(${isPivot ? col : row}, 1fr)`,
      }}
    >
      {[...Array(col * row).keys()].map((_, index) => (
        <ClockFace
          key={index}
          size={clockSize}
          hourAngle={hour[index]}
          minuteAngle={minute[index]}
          transitionDuration={`${transitionDuration}ms`}
        />
      ))}
    </div>
  );
};

export default ClockBlock;
