import { useState, useEffect } from "react";
import ClockClock from "../components/ClockClock";
import "./ClockClockPage.css";

const NORMAL_CLOCK_BLOCK_COL_COUNT = 4;
const NORMAL_CLOCK_BLOCK_COUNT = 5;
const CLOCK_MARGIN_PX = 10;

const getWindowDimensions = () => {
  const { clientWidth: width, clientHeight: height } = document.documentElement;
  return { width, height };
};

const ClockClockPage = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isPortrait = windowDimensions.height > windowDimensions.width;

  const clockSize =
    Math.floor(
      (isPortrait ? windowDimensions.height : windowDimensions.width) /
        (NORMAL_CLOCK_BLOCK_COL_COUNT * NORMAL_CLOCK_BLOCK_COUNT)
    ) - CLOCK_MARGIN_PX;

  const rowCount = Math.floor(
    (isPortrait ? windowDimensions.width : windowDimensions.height) /
      (clockSize + CLOCK_MARGIN_PX)
  );

  return (
    <div className="page">
      <ClockClock
        clockSize={`${clockSize}px`}
        isPortrait={isPortrait}
        blockSize={{ col: NORMAL_CLOCK_BLOCK_COL_COUNT, row: rowCount }}
      />
    </div>
  );
};

export default ClockClockPage;
