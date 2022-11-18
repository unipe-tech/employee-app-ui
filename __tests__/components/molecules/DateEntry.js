import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import DateEntry from "../../../components/molecules/DateEntry";

describe("DateEntry", () => {
  test("renders UI correctly", () => {
    const mockSetVal = jest.fn();
    const tree = render(<DateEntry setval={mockSetVal} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
