import React, { useState, useEffect } from "react";
import ClockBlock, { type ModeState } from "./ClockBlock";
import "./ClockClock.css";

const MILLISECOND_IN_SECOND = 1000;

interface ClockClockProps {
  clockSize?: string;
  blockSize?: {
    col: number;
    row: number;
  };
}

const ClockClock: React.FC<ClockClockProps> = ({
  clockSize = "60px",
  blockSize = { col: 4, row: 6 },
}) => {
  const formatTime = (date: Date, withColon = true) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}${withColon ? ":" : ""}${minutes}`;
  };

  const [timeString, setTimeString] = useState(formatTime(new Date()));
  const [transitionDuration, setTransitionDuration] = useState(
    (60 - new Date().getSeconds() - 2) * MILLISECOND_IN_SECOND
  );
  const [mode, setMode] = useState<ModeState>("random");

  useEffect(() => {
    const timerId = setTimeout(() => {
      switch (mode) {
        case "go to current time":
          setTimeString(formatTime(new Date()));
          setTransitionDuration(10 * MILLISECOND_IN_SECOND);
          setMode("waiting");
          break;
        case "random":
          setTransitionDuration(2 * MILLISECOND_IN_SECOND);
          setMode("go to current time");
          break;
        case "waiting":
        default:
          setTransitionDuration(18 * MILLISECOND_IN_SECOND);
          setMode("random");
          break;
      }
    }, transitionDuration);

    return () => clearInterval(timerId);
  }, [mode]);

  return (
    <div className="clock-clock-container">
      {[...timeString].map((char, index) => (
        <ClockBlock
          key={index}
          char={char}
          clockSize={clockSize}
          col={blockSize.col}
          row={blockSize.row}
          mode={mode}
          transitionDuration={transitionDuration}
        />
      ))}
    </div>
  );
};

export default ClockClock;
