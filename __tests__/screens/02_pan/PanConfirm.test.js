import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";
import { store } from "../../../store/store";
import { shallow } from "enzyme";
import { Button } from "@react-native-material/core";
import { Alert } from "react-native";
import spyOnAlert from "../../../testHelpers/spyOnAlert";
import PanConfirm from "../../../screens/02_pan/PanConfirm";
import configureStore from "redux-mock-store";
import mockStore from "../../../store/mockStore";

const middleware = [];
const mockedStore = configureStore(middleware);

const createdStore = mockedStore(mockStore);

const { pressAlertButton } = spyOnAlert();

describe("PanConfirm Screen", () => {
  describe("UI Testing", () => {
    it("testing UI rendering", () => {
      const tree = render(
        <Provider store={createdStore}>
          <NavigationContainer>
            <PanConfirm />
          </NavigationContainer>
        </Provider>
      );
      expect(tree).toMatchSnapshot();
    }, 8000);
  });
  describe("Testing Main Buttons", () => {
    it("testing No Button", () => {
      const navigate = jest.fn();
      const returnNull = jest.fn();
      const wrapper = render(
        <Provider store={createdStore}>
          <NavigationContainer>
            <PanConfirm navigation={{ navigate }} />
          </NavigationContainer>
        </Provider>
      );
      act(async () => {
        await fireEvent.press(wrapper.getByText("No"));
        await expect(navigate).toHaveBeenCalledWith("PanForm");
      });
    });
    it("testing Yes Button", () => {
      const navigate = jest.fn();
      const returnNull = jest.fn();
      const wrapper = render(
        <Provider store={createdStore}>
          <NavigationContainer>
            <PanConfirm navigation={{ navigate }} />
          </NavigationContainer>
        </Provider>
      );
      act(async () => {
        await fireEvent.press(wrapper.getByText("Yes"));
        await expect(navigate).toHaveBeenCalledWith("BankInfoForm");
      });
    });
  });
  describe("Back Button Testing", () => {
    it("NO returns null", () => {
      const returnNull = jest.fn();
      const navigate = jest.fn();
      const wrapper = render(
        <Provider store={createdStore}>
          <NavigationContainer>
            <PanConfirm navigation={{ navigate }} />
          </NavigationContainer>
        </Provider>
      );
      fireEvent.press(wrapper.getByTestId("backIcon"));
      const spyAlert = jest
        .spyOn(Alert, "alert")
        //@ts-ignore
        .mockImplementation((title, message, callbackOrButtons) =>
          callbackOrButtons[1].onPress()
        );
      act(async () => {
        await fireEvent.press(wrapper.findByLabelText("No"));
        await pressAlertButton("Nothing happens");
        await expect(returnNull).toHaveBeenCalled();
        await expect(returnNull).toHaveReturned(null);
      }, 4000);
    });
  });

  it("YES navigates to OTP Screen", () => {
    const navigate = jest.fn();
    const wrapper = render(
      <Provider store={createdStore}>
        <NavigationContainer>
          <PanConfirm navigation={{ navigate }} />
        </NavigationContainer>
      </Provider>
    );
    fireEvent.press(wrapper.getByTestId("backIcon"));
    const spyAlert = jest
      .spyOn(Alert, "alert")
      //@ts-ignore
      .mockImplementation((title, message, callbackOrButtons) =>
        callbackOrButtons[1].onPress()
      );
    act(async () => {
      await fireEvent.press(wrapper.findByLabelText("Yes"));
      await pressAlertButton("Navigates to next screen");
      await expect(navigate).toHaveBeenCalledWith("PanForm");
    }, 4000);
  });
});
