import { useParams } from "react-router-dom";
import ClockBlock from "../components/ClockBlock";

const CheckClockBlockPage = () => {
  const { size: sizeParameter } = useParams<{ size: string }>();
  const { col, row } =
    sizeParameter == "small" ? { col: 2, row: 3 } : { col: 4, row: 6 };
  const characters = "CLOCK0123456789:";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {characters.split("").map((char, index) => (
        <ClockBlock
          key={index}
          char={char}
          col={col}
          row={row}
          mode={"go to current time"}
          transitionDuration={0}
        />
      ))}
    </div>
  );
};

export default CheckClockBlockPage;
