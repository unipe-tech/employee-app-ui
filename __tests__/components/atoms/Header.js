import Header from "../../../components/atoms/Header";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import EStyleSheet from "react-native-extended-stylesheet";

describe("Login Screen", () => {
  // snapshot test
  const tree = render(
    <Header
      title={"Head"}
      onLeftIconPress={() => jest.fn()}
      onRightIconPress={() => jest.fn()}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
