import { useState } from "react";
const MAX = 1000 * 1000 * 1000 * 1;

type TerminateFunc = () => void;
const heavyWorkerFunc = (
  update: (progress: number, i: number) => void
): false | TerminateFunc => {
  if (!window.Worker) {
    console.error("Wheres ma web workers!!");
    return false;
  }

  console.log("Start working");
  const myWorker = new Worker("./worker.js", { type: "module" });
  console.log(myWorker);

  myWorker.postMessage({ MAX });
  myWorker.onmessage = (e) => {
    console.log("Hey");
    fetch("https://jsonplaceholder.typicode.com/todos/" + e.data.todoId)
      .then((response) => response.json())
      .then((json) => console.log(json));
    update(e?.data?.progress ?? 0, e?.data?.i ?? 0);
  };

  const terminate = () => () => {
    console.log("Terminating", myWorker);
    myWorker.terminate();
  };

  return terminate;
};

export default function Working() {
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState(0);
  const [i, setI] = useState(0);
  const update = (progress: number, i: number) => {
    // console.log(progress);
    setI(i);
    setProgress(progress);
  };

  const [terminate, setTerminate] = useState<false | TerminateFunc>(false);

  const handleStart = () => {
    const newTerminate = heavyWorkerFunc(update);
    console.log(newTerminate);
    if (newTerminate) {
      setTerminate(newTerminate);
    }
  };
  const handleCancel = () => {
    if (terminate) {
      terminate();
      setTerminate(false);
    }
  };

  return (
    <div>
      {terminate !== false ? (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#000000AA",
          }}
        >
          <button onClick={handleCancel}>cancel</button>
        </div>
      ) : null}
      <button onClick={handleStart}>worker func</button>
      <div>
        <span>{progress}</span>
      </div>
      <div>
        <span
          style={{
            display: "flex",
            border: "1px solid #000",
            width: "1000px",
          }}
        >
          <span
            style={{
              width: `${progress}%`,
              backgroundColor: "#0F0",
            }}
          >
            {MAX} / {i}
          </span>
        </span>
      </div>
      <button onClick={() => setCounter((count) => count + 1)}>
        count++ ({counter})
      </button>
    </div>
  );
}
