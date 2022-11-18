import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import DropDownForm from "../../../components/molecules/DropDownForm";

describe("DropDownForm", () => {
  test("renders UI correctly", () => {
    const tree = render(<DropDownForm data={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
