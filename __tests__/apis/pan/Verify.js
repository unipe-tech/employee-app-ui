import { render, fireEvent, act } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import { shallow } from "enzyme";
import spyOnAlert from "../../../testHelpers/spyOnAlert";
import Verify from "../../../apis/pan/Verify";
import { form } from "../../../styles";
import "isomorphic-fetch";

const { pressAlertButton } = spyOnAlert();

describe("Pan Verify Screen", () => {
  describe("UI Rendering", () => {
    it("testing UI rendering", () => {
      const tree = shallow(
        <Provider store={store}>
          <NavigationContainer>
            <Verify />
          </NavigationContainer>
        </Provider>
      );
      expect(tree).toMatchSnapshot();
    }, 8000);

    it("case 1000", () => {
      const navigate = jest.fn();
      const consoleSpy = jest.spyOn(console, "log");
      const component = render(
        <Provider store={store}>
          <NavigationContainer>
            <Verify
              data={{ pan_number: "ABCDE1234F", consent: "Y" }}
              url={
                "https://unipeapi.herokuapp.com/pan-api/fetch-detailed/200/1000"
              }
              style={form.nextButton}
              disabled={false}
              navigation={{ navigate }}
            />
          </NavigationContainer>
        </Provider>
      );
      fireEvent.press(component.getByTestId("apiButton"));
      act(async () => {
        await expect(navigate).toBeCalledWith("PanConfirm");
        await expect(consoleSpy).toHaveBeenCalledWith("PanVerifyFetch");
      });
    });
  });
});
