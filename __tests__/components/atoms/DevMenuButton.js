import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import DevMenuButton from "../../../components/atoms/DevMenuButton";

describe("DevMenuButton", () => {
  test("renders UI correctly", () => {
    const tree = render(<DevMenuButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
