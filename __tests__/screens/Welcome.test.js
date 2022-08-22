import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import WelcomePage from "../../screens/00_login/WelcomePage";
import { store } from "../../store/store";

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
          <WelcomePage />
        </NavigationContainer>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // navigates to the next screen => Login Screen
  it("navigates on button press", () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <WelcomePage navigation={{ navigate }} />
        </NavigationContainer>
      </Provider>
    );
    const event = fireEvent.press(getByText("Welcome!"));
    expect(navigate).toHaveBeenCalledWith("Login");
  });
});
