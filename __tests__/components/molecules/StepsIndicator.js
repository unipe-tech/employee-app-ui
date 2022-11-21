import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import StepsIndicator from "../../../components/molecules/StepsIndicator";

describe("StepsIndicator", () => {
  test("renders UI correctly", () => {
    const tree = render(<StepsIndicator />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
