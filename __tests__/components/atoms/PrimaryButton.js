import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import PrimaryButton from "../../../components/atoms/PrimaryButton";

describe("PrimaryButton", () => {
  test("renders UI correctly", () => {
    const tree = render(<PrimaryButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
