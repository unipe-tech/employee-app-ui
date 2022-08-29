import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";
import { store } from "../../../store/store";
import { shallow } from "enzyme";
import { Button } from "@react-native-material/core";
import { Alert } from "react-native";
import spyOnAlert from "../../../testHelpers/spyOnAlert";
import AadhaarConfirm from "../../../screens/01_aadhaar/AadhaarConfirm";
import mockStore from "redux-mock-store";

// jest.mock("react-redux", () => ({
//   ...jest.requireActual("react-redux"),
//   useSelector: jest.fn().mockImplementation((selector) => selector()),
//   useDispatch: jest.fn(),
// }));

const mockConfigState = {
  data: {},
  number: "123456789101",
  submitOTPtxnId: "5",
  verifyMsg: "Done",
  verifyStatus: "PENDING",
};
const mockSearchState = {
  data: {},
  number: "987654321010",
  submitOTPtxnId: "2",
  verifyMsg: "Pending",
  verifyStatus: "PENDING",
};

jest.mock("react-redux", () => ({
  useSelector: jest
    .fn()
    .mockReturnValueOnce(mockConfigState)
    .mockReturnValueOnce(mockSearchState),
}));

jest.mock("../../../helpers/Selectors.js", () => ({
  id: jest.fn().mockReturnValue("1"),
  data: jest.fn().mockReturnValue("myTestDob"),
  number: jest.fn().mockReturnValue("myTestDob"),
  aadhaarSlice: jest.fn().mockReturnValue("myTestDob"),
}));

const { pressAlertButton } = spyOnAlert();

describe("AadhaarConfirm Screen", () => {
  describe("UI Testing", () => {
    it("testing UI rendering", () => {
      const tree = render(
        <Provider store={store}>
          <NavigationContainer>
            <AadhaarConfirm />
          </NavigationContainer>
        </Provider>
      );
      expect(tree).toMatchSnapshot();
    }, 8000);
  });
  describe("Back Button testing", () => {
    beforeEach(() => {
      useSelectorMock.mockImplementation((selector) => selector(store));
    });
    afterEach(() => {
      useSelector.mockClear();
    });

    const useSelectorMock = useSelector();

    const backAlert = jest.fn();
    it("testing button press", () => {
      const component = render(
        <Provider store={store}>
          <NavigationContainer>
            <AadhaarConfirm />
          </NavigationContainer>
        </Provider>
      );
      fireEvent.press(component.findByTestId("backIcon"));
      // expect(backAlert).toBeCalled();
      console.log(component.debug);
    });
  });
});
