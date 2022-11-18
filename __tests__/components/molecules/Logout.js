import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import Logout from "../../../components/molecules/Logout";

describe("Logout", () => {
  test("renders UI correctly", () => {
    const tree = render(<Logout />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
