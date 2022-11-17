import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import FormInput from "../../../components/atoms/FormInput";

describe("FormInput", () => {
  test("renders UI correctly", () => {
    const tree = render(<FormInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
