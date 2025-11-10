import ClockClock from "../components/ClockClock";
import "./ClockClockPage.css";

const NORMAL_CLOCK_BLOCK_COL_COUNT = 4;
const NORMAL_CLOCK_BLOCK_COUNT = 5;
const CLOCK_MARGIN_PX = 20;

const ClockClockPage = () => {
  const pageWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  const clockSize =
    Math.floor(
      pageWidth / (NORMAL_CLOCK_BLOCK_COL_COUNT * NORMAL_CLOCK_BLOCK_COUNT)
    ) - CLOCK_MARGIN_PX;

  return (
    <div className="page">
      <ClockClock clockSize={`${clockSize}px`} />
    </div>
  );
};

export default ClockClockPage;
