import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import Loading from "../../../components/atoms/Loading";

describe("Loading", () => {
  test("renders UI correctly", () => {
    const tree = render(<Loading />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
