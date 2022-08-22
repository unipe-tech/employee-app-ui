// setup-tests.js
import MockAsyncStorage from "mock-async-storage";

const mockImpl = new MockAsyncStorage();
jest.useFakeTimers();
// jest.useFakeTimers();
// jest.setTimeout(30000);
jest.mock("@react-native-community/async-storage", () => mockImpl);
