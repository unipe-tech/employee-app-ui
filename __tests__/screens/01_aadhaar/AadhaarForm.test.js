import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import AadhaarForm from "../../../screens/01_aadhaar/AadhaarForm";
import { store } from "../../../store/store";
import { shallow } from "enzyme";
import { Button } from "@react-native-material/core";
import { Alert } from "react-native";
import spyOnAlert from "../../../testHelpers/spyOnAlert";

const { pressAlertButton } = spyOnAlert();

describe("AadhaarForm Screen", () => {
  describe("Skip Button flow", () => {
    it("testing UI rendering", () => {
      const tree = shallow(
        <Provider store={store}>
          <NavigationContainer>
            <AadhaarForm />
          </NavigationContainer>
        </Provider>
      );
      expect(tree).toMatchSnapshot();
    }, 8000);

    it("testing no button in alert box", () => {
      const SkipAadhaar = jest.fn();
      const navigate = jest.fn();
      const returnNull = jest.fn();
      const wrapper = render(
        <Provider store={store}>
          <NavigationContainer>
            <AadhaarForm navigation={{ navigate }} />
          </NavigationContainer>
        </Provider>
      );
      fireEvent.press(wrapper.getByTestId("forwardIcon"));
      expect(SkipAadhaar).toBeTruthy();
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
        await expect(returnNull).toReturn(null);
      }, 4000);
    });

    it("testing yes button in alert box", () => {
      const SkipAadhaar = jest.fn();
      const navigate = jest.fn();
      const navigateToPan = jest.fn();
      const wrapper = render(
        <Provider store={store}>
          <NavigationContainer>
            <AadhaarForm navigation={{ navigate }} />
          </NavigationContainer>
        </Provider>
      );
      fireEvent.press(wrapper.getByTestId("forwardIcon"));
      expect(SkipAadhaar).toBeTruthy();
      const spyAlert = jest
        .spyOn(Alert, "alert")
        //@ts-ignore
        .mockImplementation((title, message, callbackOrButtons) =>
          callbackOrButtons[1].onPress()
        );
      act(async () => {
        await fireEvent.press(wrapper.findByLabelText("Yes"));
        await pressAlertButton("Navigates to next screen");
        await expect(navigateToPan).toHaveBeenCalled();
        await expect(navigate).toHaveBeenCalledWith("PanForm");
      }, 4000);
    });
  });

  describe("Back Button Testing", () => {
    it("NO returns null", () => {
      const returnNull = jest.fn();
      const navigate = jest.fn();
      const wrapper = render(
        <Provider store={store}>
          <NavigationContainer>
            <AadhaarForm navigation={{ navigate }} />
          </NavigationContainer>
        </Provider>
      );
      act(async () => {
        await fireEvent.press(wrapper.getByTestId("backIcon"));
        await expect(returnNull).toHaveBeenCalled();
        await expect(returnNull).toReturn(null);
      });
    });

    it("YES navigates to OTP Screen", () => {
      const navigateToOtp = jest.fn();
      const navigate = jest.fn();
      const wrapper = render(
        <Provider store={store}>
          <NavigationContainer>
            <AadhaarForm navigation={{ navigate }} />
          </NavigationContainer>
        </Provider>
      );
      act(async () => {
        await fireEvent.press(wrapper.getByTestId("backIcon"));
        await expect(navigateToOtp).toHaveBeenCalled();
        await expect(navigateToOtp).toHaveBeenCalledWith("Otp");
      });
    });
  });
});
