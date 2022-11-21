import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import TopAppBar from "../../../components/molecules/TopAppBar";

describe("TopAppBar", () => {
  test("renders UI correctly", () => {
    const tree = render(<TopAppBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
