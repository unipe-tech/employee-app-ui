import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import PopableInput from "../../../components/molecules/PopableInput";

describe("PopableInput", () => {
  test("renders UI correctly", () => {
    const tree = render(<PopableInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
