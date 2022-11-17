import Header from "../../../components/atoms/Header";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";

describe("Header", () => {
  test("renders UI correctly", () => {
    const tree = render(
      <Header
        title={"Head"}
        onLeftIconPress={() => jest.fn()}
        onRightIconPress={() => jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
