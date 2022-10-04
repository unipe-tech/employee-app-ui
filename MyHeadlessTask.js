export default MyHeadlessTask = async () => {
  console.log("Receiving HeartBeat!");
  store.dispatch(setHeartBeat(true));
  setTimeout(() => {
    store.dispatch(setHeartBeat(false));
  }, 1000);
};
