module.exports = () => {
  console.log("Receiving HeartBeat!");
  // store.dispatch(setHeartBeat(true));
  setTimeout(() => {
    // store.dispatch(setHeartBeat(false));
    console.log("task running");
  }, 1000);
};
