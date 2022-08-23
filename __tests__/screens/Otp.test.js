import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import OTPScreen from "../../screens/00_login/OTPScreen";
import { store } from "../../store/store";
import { shallow } from "enzyme";

let navigation;
beforeEach(() => {
  navigation = {
    dispatch: jest.fn(),
    navigate: jest.fn(),
  };
});

describe("OTP Screen", () => {
  // snapshot test
  it("should render OTPScreen UI properly", () => {
    const tree = shallow(
      <Provider store={store}>
        <NavigationContainer>
          <OTPScreen />
        </NavigationContainer>
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  }, 8000);
});
