import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import FuzzyCheck from "../../../components/molecules/FuzzyCheck";

describe("FuzzyCheck", () => {
  test("renders UI correctly", () => {
    const tree = render(<FuzzyCheck />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
