import "./styles.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [sec, updateSec] = useState(0);
  const [min, updateMin] = useState(0);
  const [hour, updateHour] = useState(0);
  const [started, updateStarted] = useState(false);
  let ref = useRef(null);
  //var timer;

  const startTime = () => {
    updateStarted(true);
  };
  useEffect(() => {
    //let timer;
    if (started) {
      ref.current = setInterval(() => {
        updateSec(sec + 1);
        if (sec >= 60) {
          updateMin(min + 1);
          updateSec(0);
        }
        if (min >= 60) {
          updateHour(hour + 1);
          updateMin(0);
        }
      }, 1000);
    }
    return () => clearInterval(ref.current);
  });

  const stopTimer = () => {
    updateStarted(false);
    clearInterval(ref.current);
  };

  const convertSecToMinute = (sec) => {
    return Math.floor(sec / 60);
  };
  const convertMinToHour = (min) => {
    return Math.floor(min / 60);
  };

  return (
    <div className="App">
      <button onClick={startTime}>Start Timer</button>
      <button onClick={stopTimer}>Stop Timer</button>
      <h1>
        {sec}:{min}:{hour}
      </h1>
    </div>
  );
}
