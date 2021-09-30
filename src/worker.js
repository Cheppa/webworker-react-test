onmessage = function (e) {
  const { MAX } = e.data;
  //   const progressFunc = (i) => Math.ceil((i / MAX) * 100);
  const progressFunc = (i) => Math.ceil((i / MAX) * 10) * 10;
  console.log(e);
  let current = 0;
  let progress = 0;

  let todoId = 1;
  console.log("Start", "Max", MAX);
  for (let i = 0; i < MAX; i++) {
    progress = progressFunc(i);
    // console.log("Running");
    if (progress !== current) {
      postMessage({
        progress,
        i,
        todoId,
      });
      todoId++;
      //   update(progress);
    }
    current = progress;
  }
  postMessage({
    progress,
    i: MAX,
    todoId,
  });
  console.log("End");
  // console.log('Worker: Message received from main script');
  // const result = e.data[0] * e.data[1];
  // if (isNaN(result)) {
  //   postMessage('Please write two numbers');
  // } else {
  //   const workerResult = 'Result: ' + result;
  //   console.log('Worker: Posting message back to main script');
  //   postMessage(workerResult);
  // }
};
