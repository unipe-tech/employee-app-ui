import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import Checkbox from "../../../components/atoms/Checkbox";

describe("Checkbox", () => {
  test("renders UI correctly", () => {
    const tree = render(<Checkbox />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
