import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import AadhaarVerify from "../../../screens/01_aadhaar/AadhaarVerify";
import { store } from "../../../store/store";
import { shallow } from "enzyme";
import { Button } from "@react-native-material/core";
import { Alert } from "react-native";
import spyOnAlert from "../../../testHelpers/spyOnAlert";

const { pressAlertButton } = spyOnAlert();

describe("AadhaarVerify Screen", () => {
  describe("Back Button Testing", () => {
    it("testing UI rendering", () => {
      const tree = shallow(
        <Provider store={store}>
          <NavigationContainer>
            <AadhaarVerify />
          </NavigationContainer>
        </Provider>
      );
      expect(tree).toMatchSnapshot();
    }, 8000);

    // it("YES navigates to AadhaarForm Screen", () => {
    //   const navigate = jest.fn();
    //   const wrapper = render(
    //     <Provider store={store}>
    //       <NavigationContainer>
    //         <AadhaarVerify navigation={{ navigate }} />
    //       </NavigationContainer>
    //     </Provider>
    //   );
    //   fireEvent.press(wrapper.getByTestId("backIcon"));
    //   expect(navigate).toHaveBeenCalledWith("AadhaarForm");
    // });
  });
});
