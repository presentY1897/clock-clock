import ClockBlock from "../components/ClockBlock";

const CheckClockBlockPage = () => {
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
          col={4}
          row={6}
          mode={"go to current time"}
          transitionDuration={0}
        />
      ))}
    </div>
  );
};

export default CheckClockBlockPage;
