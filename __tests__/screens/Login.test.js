import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import LoginScreen from "../../screens/00_login/LoginScreen";
import { store } from "../../store/store";
import { TextInput } from "react-native";

let navigation;
beforeEach(() => {
  navigation = {
    dispatch: jest.fn(),
    navigate: jest.fn(),
  };
});

describe("Welcome Screen", () => {
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
    const component = render(
      <Provider store={store}>
        <NavigationContainer>
          <LoginScreen navigation={{ navigate }} />
        </NavigationContainer>
      </Provider>
    );
    fireEvent.changeText(component.findByTestId("login-number"), "8168176767");
    const event = fireEvent.press(component.getByText("Continue"));
    expect(navigate).toHaveBeenCalledWith("Otp");
  });
});
