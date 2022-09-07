import BackgroundService from "react-native-background-actions";
import BackgroundJob from "react-native-background-actions";
import { progressBar } from "../styles";

class BService {
  async Task({ task, isResolve }) {
    await new Promise(async (resolve) => {
      task();
      isResolve ? resolve() : null;
    });
  }
  Start(props) {
    // props :
    // {taskName: <String>,
    // taskTitle: <String>,
    // taskDesc: <String>,
    // task: <FunctionRef>,
    // isResolve: <Boolean>,
    // progressBar: <Boolean>}
    console.log("BackgroundProcess Started", props);
    this.Options = {
      taskName: props.taskName,
      taskTitle: props.taskTitle,
      taskDesc: props.taskDesc,
      taskIcon: {
        name: "ic_launcher",
        type: "mipmap",
      },
      color: "#4E46F1",
      parameters: { task: props.task, isResolve: props.isResolve },
      progressBar: { indeterminate: props.progressBar },
      linkingURI: "unipe://unipe",
    };
    BackgroundService.start(this.Task, this.Options);
  }
  Stop() {
    BackgroundService.stop();
  }
}
export const BackgroundProcess = new BService();
