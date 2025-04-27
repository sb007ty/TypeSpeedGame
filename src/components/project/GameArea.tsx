import useSWRImmutable from "swr/immutable";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import { randomQuote } from "@/apiService/endpoints";
import { fetchRandomQuote } from "@/apiService/apiCalls";
import Loader from "./LoaderComp";
import LoaderComp from "./LoaderComp";
import { JSX, useRef, useState } from "react";
import Timer from "./Timer";
import GameOverAlert from "./GameOverAlert";
import { useCalculateScoreForTimeChange, useTimer } from "@/utils/hooks";

function GameArea() {
  const [textAreaVal, setTextAreaVal] = useState("");
  const [gameStart, setGameStart] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [incorrectInd, setIncorrectInd] = useState(-1);
  const [score, setScore] = useState(0);
  const [openGameOverAlert, setOpenGameOverAlert] = useState(false);
  const initialTimeRef = useRef(Date.now());
  useCalculateScoreForTimeChange(
    setScore,
    textAreaVal,
    gameStart,
    initialTimeRef
  );
  const { time, setTime } = useTimer(setTimeUp, gameStart, resetGame);
  const userInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (timeUp) return;
    if (!gameStart) {
      setGameStart(true);
      initialTimeRef.current = Date.now();
    }
    const val = e.target.value;
    const len = val.length;
    setTextAreaVal(val);
    const timePassed = Date.now() - initialTimeRef.current;
    const timePassedSec = timePassed / 1000 || 1;
    const newScore = Math.floor((val.length * 60) / (5 * timePassedSec));
    setScore(Math.round(newScore));

    if (val.length === 0) {
      setIncorrectInd(-1);
      return;
    }
    const textToComp = quoteData?.content.slice(0, len);
    // console.log(textToComp);
    if (val === textToComp) {
      setIncorrectInd(-1);
      if (quoteData?.content.length === val.length) {
        console.log(newScore, "newS", val);
        resetGame();
      }
    } else {
      for (let i = 0; i < len; i++) {
        // console.log(val[i], textToComp[i], "bro", len, val, i);
        if (val[i] !== textToComp[i]) {
          setIncorrectInd(i);
          break;
        }
      }
    }
  };
  function resetGame() {
    setGameStart(false);
    setTimeUp(false);
    setIncorrectInd(-1);
    setOpenGameOverAlert(true);
  }
  const {
    data: quoteData,
    isLoading,
    error,
    mutate,
    isValidating,
  } = useSWRImmutable(randomQuote, fetchRandomQuote);
  console.log(isLoading, isValidating, " hello**");
  // console.log(quoteData);
  // console.log(incorrectInd, "inco");
  const { content } = quoteData || {};
  function displayText() {
    let dispSpan: JSX.Element;
    console.log(textAreaVal.length);
    if (incorrectInd === -1) {
      dispSpan = (
        <>
          <span className="bg-green-300">
            {content.slice(0, textAreaVal.length)}
          </span>
          <span> {content.slice(textAreaVal.length)}</span>
        </>
      );
    } else {
      dispSpan = (
        <>
          <span className="bg-green-300">{content.slice(0, incorrectInd)}</span>
          <span className="bg-red-400">
            {content.slice(incorrectInd, textAreaVal.length)}
          </span>
          <span> {content.slice(textAreaVal.length)}</span>
        </>
      );
    }
    return (
      <p
        className="test-text select-none"
        // onMouseDown={(e) => {
        //   console.log("bro");
        //   e.preventDefault();
        // }}
      >
        {dispSpan}
      </p>
    );
  }
  const textAreaBgColor = incorrectInd !== -1 ? "bg-red-300" : "";
  return (
    <div className="game-area max-w-[1024px] w-[100%] md:w-[80%] lg:w-[50%]">
      <Card>
        <CardHeader>
          <CardTitle className="flex">
            <span> Typing Speed Test</span>
            <Badge variant="destructive" className="h-9 min-w-[150px] ml-auto">
              {!gameStart ? (
                <div>
                  <span className="w-[50px]">Time Left: </span>
                  <span className="w-[100px]">2:30</span>
                </div>
              ) : (
                <Timer
                  setTimeUp={setTimeUp}
                  textAreaVal={textAreaVal}
                  setScore={setScore}
                  time={time}
                />
              )}
            </Badge>{" "}
          </CardTitle>
          <CardDescription>Type the text below: </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading || isValidating ? (
            <LoaderComp className="h-[50px]" />
          ) : (
            displayText()
          )}
          <p className="mt-3">
            <Textarea
              className={`min-h-40 ${textAreaBgColor}`}
              value={textAreaVal}
              onChange={userInput}
              onPaste={(e) => e.preventDefault()}
            />
          </p>
        </CardContent>
        <CardFooter className="gap-1">
          <Badge variant="outline" className="h-9 min-w-[150px]">
            Score: {score} wpm
          </Badge>
          <Button className="cursor-pointer min-w-[150px]" onClick={resetGame}>
            Reset
          </Button>
        </CardFooter>
      </Card>
      <GameOverAlert
        openGameOverAlert={openGameOverAlert}
        setOpenGameOverAlert={setOpenGameOverAlert}
        score={score}
        setScore={setScore}
        setTextAreaVal={setTextAreaVal}
        mutate={mutate}
      />
    </div>
  );
}

export default GameArea;
