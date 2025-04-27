import React, { useEffect, useRef, useState } from "react";

export const useCalculateScoreForTimeChange = (
  setScore: React.Dispatch<React.SetStateAction<number>>,
  textAreaVal: string,
  gameStart: boolean,
  initialTimeRef: React.RefObject<number>
) => {
  useEffect(() => {
    console.log("TEXTAREAVAL***");
    let timer: NodeJS.Timeout;
    if (gameStart) {
      timer = setInterval(() => {
        const timePassed = Date.now() - initialTimeRef.current;
        const timePassedSec = timePassed / 1000;
        const newScore = Math.floor(
          (textAreaVal.length * 60) / (5 * timePassedSec)
        );
        setScore(Math.round(newScore));
        console.log(
          newScore,
          "newSc**",
          (textAreaVal.length * 60) / timePassedSec,
          textAreaVal
        );
        if (timePassedSec >= 150) {
          clearInterval(timer);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [textAreaVal, gameStart]);
};

export const useTimer = (
  setTimeUp: React.Dispatch<React.SetStateAction<boolean>>,
  gameStart: boolean,
  resetGame
) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStart) {
      const initial = Date.now();
      timer = setInterval(() => {
        const timePassed = Date.now() - initial;
        const timePassedSec = timePassed / 1000;
        if (timePassedSec >= 150) {
          clearInterval(timer);
          setTime(150000);
          setTimeUp(true);
          resetGame();
        }
        setTime(timePassed);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [gameStart, resetGame]);
  return { time, setTime };
};
