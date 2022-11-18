import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import DateEntry from "../../../components/molecules/DateEntry";

describe("DateEntry", () => {
  test("renders UI correctly", () => {
    const tree = render(<DateEntry />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
