import { useEffect, useRef, useState } from "react";
import { Badge } from "../ui/badge";

function Timer({
  time,
}: {
  setTimeUp: React.Dispatch<React.SetStateAction<boolean>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  textAreaVal: string;
  time: number;
}) {
  //   console.log(time);
  const secondsPassed = time / 1000;
  const secondsLeft = 150 - Math.round(secondsPassed);
  let minsLeft = Math.floor(secondsLeft / 60);
  const secondsLeft2 = secondsLeft % 60;
  let secondsLeftStr = String(secondsLeft2);
  if (secondsLeftStr.length === 1) secondsLeftStr = "0" + secondsLeftStr;
  if (secondsLeftStr === "60") {
    secondsLeftStr = "00";
    minsLeft += 1;
  }
  if (secondsLeft <= 0) {
    return <span>Time Up</span>;
  }
  return (
    <div>
      <span className="w-[50px]">Time Left: </span>
      <span className="w-[100px]"> {`${minsLeft}:${secondsLeftStr}`}</span>
    </div>
  );
}

export default Timer;
