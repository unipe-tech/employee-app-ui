jest.useFakeTimers();
import MockAsyncStorage from "mock-async-storage";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });
const mockImpl = new MockAsyncStorage();
jest.mock("@react-native-async-storage/async-storage", () => mockImpl);
