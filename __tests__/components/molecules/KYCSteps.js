import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import KYCSteps from "../../../components/molecules/KYCSteps";

describe("KYCSteps", () => {
  test("renders UI correctly", () => {
    const tree = render(<KYCSteps />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
