import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import { shallow } from "enzyme";
import Otp from "../../../apis/aadhaar/Otp";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "@react-native-material/core";
import "isomorphic-fetch";
import { act } from "react-test-renderer";

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
      const goForFetch = jest.fn({
        fetchUrl:
          "http://unipeapi.herokuapp.com/aadhaar-api/boson/generate-otp",
        postData: { aadhaar_number: "123456789101", consent: "Y" },
      });
      const navigate = jest.fn();

      const component = render(
        <Provider store={store}>
          <NavigationContainer>
            <Otp
              url="http://unipeapi.herokuapp.com/aadhaar-api/boson/generate-otp/200/1001"
              data={{ aadhaar_number: "123456789101", consent: "Y" }}
              disabled={false}
              goForFetch={goForFetch}
              navigation={{ navigate }}
            />
          </NavigationContainer>
        </Provider>
      );
      const wrapper = shallow(
        <Provider store={store}>
          <NavigationContainer>
            <Otp
              url="http://unipeapi.herokuapp.com/aadhaar-api/boson/generate-otp/200/1001"
              data={{ aadhaar_number: "123456789101", consent: "Y" }}
              disabled={false}
              goForFetch={goForFetch}
              navigation={{ navigate }}
            />
          </NavigationContainer>
        </Provider>
      );
      fireEvent.press(component.getByTestId("apiButton"));
      // act(async () => {
      // const result = fetch(
      //   "https://unipeapi.herokuapp.com/aadhaar-api/boson/generate-otp/200/1001"
      // )
      //   .then((res) => res.json())
      //   .then((resJson) => {
      //     expect(resJson.data.code).toBe("1001");
      act(async () => {
        // await goForFetch();

        expect(navigate).toHaveBeenCalledWith("AadhaarVerif");
      });
      // expect(navigate).toBeCalledWith("AadhaarVerify");
      // });

      // });
    });
  });
});
