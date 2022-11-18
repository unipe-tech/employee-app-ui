import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import Logout from "../../../components/molecules/Logout";
import configureStore from "redux-mock-store";
import mockStore from "../../../store/mockStore";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";

const middleware = [];

const mockedStore = configureStore(middleware);

const createdStore = mockedStore(mockStore);

describe("Logout", () => {
  test("renders UI correctly", () => {
    const tree = render(
      <Provider store={createdStore}>
        <NavigationContainer>
          <Logout />
        </NavigationContainer>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
