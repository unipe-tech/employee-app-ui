import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import BottomSheetWrapper from "../../../components/atoms/BottomSheetWrapper";

describe("Bottom Sheet Wrapper", () => {
  test("renders UI correctly", () => {
    const tree = render(<BottomSheetWrapper />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
