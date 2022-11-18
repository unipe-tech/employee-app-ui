import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import AddressDropdown from "../../../components/molecules/AddressDropdown";

describe("AddressDropdown", () => {
  test("renders UI correctly", () => {
    const tree = render(<AddressDropdown />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
