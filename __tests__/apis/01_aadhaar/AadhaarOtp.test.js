import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import { shallow } from "enzyme";
import Otp from "../../../apis/aadhaar/Otp";
import { render } from "@testing-library/react-native";
import { Button } from "@react-native-material/core";

describe("AadhaarOTP API", () => {
  describe("UI rendering test", () => {
    it("testing UI rendering", () => {
      const tree = shallow(
        <Provider store={store}>
          <NavigationContainer>
            <Otp
              url="http://unipeapi.herokuapp.com/aadhaar-api/boson/generate-otp"
              data={{ aadhaar_number: "123456789101", consent: "Y" }}
              disabled={true}
            />
          </NavigationContainer>
        </Provider>
      );
      expect(tree).toMatchSnapshot();
    }, 8000);

    it("testing OTP component", () => {
      const component = render(
        <Provider store={store}>
          <NavigationContainer>
            <Otp
              url="http://unipeapi.herokuapp.com/aadhaar-api/boson/generate-otp"
              data={{ aadhaar_number: "123456789101", consent: "Y" }}
              disabled={true}
            />
          </NavigationContainer>
        </Provider>
      );
      const wrapper = shallow(
        <Provider store={store}>
          <NavigationContainer>
            <Otp
              url="http://unipeapi.herokuapp.com/aadhaar-api/boson/generate-otp"
              data={{ aadhaar_number: "123456789101", consent: "Y" }}
              disabled={true}
            />
          </NavigationContainer>
        </Provider>
      );
      expect(wrapper.find(Button)).toBeDefined();
    });
  });
});
