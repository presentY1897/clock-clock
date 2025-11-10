import React from "react";
import "./ClockFace.css";

type HandProps = {
  innerSize: string;
  outerSize: string;
  width: string;
};

const Hand: React.FC<HandProps> = ({ innerSize, outerSize, width = "1%" }) => {
  return (
    <div
      className="hand-container"
      style={{
        width: `${width}`,
      }}
    >
      <div className="hand-inner-container">
        <div className="hand" style={{ height: `${innerSize}` }}></div>
      </div>
      <div className="hand-outer-container">
        <div className="hand" style={{ height: `${outerSize}` }}></div>
      </div>
    </div>
  );
};

type TransitionProps = {
  transitionDuration: string;
  transitionTimingFunction?: string;
};

type ClockFaceProps = {
  size: string;
  hourAngle: number;
  minuteAngle: number;
  hourHand: HandProps;
  minuteHand: HandProps;
} & TransitionProps;

const ClockFace: React.FC<Partial<ClockFaceProps>> = ({
  size = "100px",
  hourAngle = 0,
  minuteAngle = 0,
  transitionDuration = "1s",
  transitionTimingFunction = "linear",
  hourHand = { innerSize: "80%", outerSize: "1%", width: "4%" },
  minuteHand = { innerSize: "90%", outerSize: "1%", width: "4%" },
}) => {
  return (
    <div
      className="clock-face-container"
      style={{
        width: size,
        height: size,
        boxShadow: `inset calc(-${size} * 0.2) 1px rgba(118, 112, 112, 0.5)`,
      }}
    >
      <div className="clock-face">
        <div
          className="clock-hand"
          style={{
            transform: `rotate(${hourAngle}deg)`,
            transitionDuration: `${transitionDuration}`,
            transitionTimingFunction: `${transitionTimingFunction}`,
          }}
        >
          <Hand
            innerSize={hourHand.innerSize}
            outerSize={hourHand.outerSize}
            width={hourHand.width}
          />
        </div>
        <div
          className="clock-hand"
          style={{
            transform: `rotate(${minuteAngle}deg)`,
            transitionDuration: `${transitionDuration}`,
            transitionTimingFunction: `${transitionTimingFunction}`,
          }}
        >
          <Hand
            innerSize={minuteHand.innerSize}
            outerSize={minuteHand.outerSize}
            width={minuteHand.width}
          />
        </div>
      </div>
    </div>
  );
};

export default ClockFace;
