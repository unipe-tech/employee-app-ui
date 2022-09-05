import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import { shallow, mount } from "enzyme";
import Otp from "../../../apis/aadhaar/Otp";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "@react-native-material/core";
import "isomorphic-fetch";
import { act } from "react-test-renderer";
import ApiView from "../../../apis/ApiView";

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
      act(async () => {
        expect(navigate).toHaveBeenCalledWith("AadhaarVerify");
      });
    });
  });
  describe("State tests", () => {
    let wrapper;
    let component;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation((init) => [init, setState]);

    beforeEach(() => {
      const goForFetch = jest.fn();
      const navigate = jest.fn();
      wrapper = shallow(
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
      component = render(
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
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("Should set Verify Message", () => {
      it("call setVerifyMessage and set verify message to sent", () => {
        expect(wrapper.find({ testID: "apiButton" })).toBeDefined();
        // wrapper.find({ testID: "apiButton" }).first().simulate("click");
        const goForFetch = jest.fn();
        fireEvent.press(component.getByText("Continue"));
        // expect(goForFetch).toBeCalled();
        // act(async () => {
        //   await expect(goForFetch).toHaveBeenCalledWith({
        //     fetchUrl:
        //       "http://unipeapi.herokuapp.com/aadhaar-api/boson/generate-otp/200/1001",
        //     postData: { aadhaar_number: "123456789101", consent: "Y" },
        //   });
        // });
        expect(setState).toHaveBeenCalled();
      });
    });
  });
});
