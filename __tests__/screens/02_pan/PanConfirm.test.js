import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import { shallow } from "enzyme";
import { Button } from "@react-native-material/core";
import { Alert } from "react-native";
import spyOnAlert from "../../../testHelpers/spyOnAlert";
import PanConfirm from "../../../screens/02_pan/PanConfirm";

const { pressAlertButton } = spyOnAlert();

describe("PanConfirm Screen", () => {
  describe("Back Button Testing", () => {
    it("testing UI rendering", () => {
      const tree = shallow(
        <Provider store={store}>
          <NavigationContainer>
            <PanConfirm />
          </NavigationContainer>
        </Provider>
      );
      expect(tree).toMatchSnapshot();
    }, 8000);
  });
});
