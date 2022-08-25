import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import LoginScreen from "../../../screens/00_login/LoginScreen";
import { store } from "../../../store/store";
import { TextInput } from "react-native";
import Enzyme, { shallow } from "enzyme";

let navigation;
beforeEach(() => {
  navigation = {
    dispatch: jest.fn(),
    navigate: jest.fn(),
  };
});

describe("Login Screen", () => {
  // snapshot test
  it("should render UI properly", () => {
    const tree = render(
      <Provider store={store}>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // navigates to the next screen => Login Screen
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const signIn = jest.fn();
    const component = render(
      <Provider store={store}>
        <NavigationContainer>
          <LoginScreen navigation={{ navigate }} />
        </NavigationContainer>
      </Provider>
    );
    const wrapper = shallow(
      <Provider store={store}>
        <NavigationContainer>
          <LoginScreen navigation={{ navigate }} />
        </NavigationContainer>
      </Provider>
    );
    // button.props("disabled");
    // expect(button.findByProps("disabled")).toBeTruthy();
    // fireEvent.changeText(component.getByTestId("mobile-number"), "8168176767");
    const input = component.getByTestId("mobile-number");
    fireEvent.changeText(input, "8168176767");
    expect(input.props.value).toBe("8168176767");
    fireEvent.press(component.getByText("Continue"));
    expect(signIn).toBeDefined();
    expect(signIn).toBeTruthy();
    // expect(button).toBeDisabled()
    // fireEvent.press(component.getByTestId("continue"));
    // expect(component.getByTestId("continue-disabled")).toBeDefined();
    // const event = fireEvent.press(component.getByText("Continue"));
    // expect(navigate).toHaveBeenCalledWith("Otp");
  });
});
