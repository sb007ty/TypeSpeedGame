import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import GameArea from "./components/project/GameArea";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      document.documentElement.setAttribute("data-theme", "dark");
    }, 2000);
  }, []);
  console.log("hello");
  return (
    <div className="app flex justify-center items-center min-h-[100vh]">
      <GameArea />
    </div>
  );
}

export default App;
