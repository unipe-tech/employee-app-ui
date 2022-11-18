import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import CollapsibleCard from "../../../components/molecules/CollapsibleCard";

describe("CollapsibleCard", () => {
  test("renders UI correctly", () => {
    const tree = render(<CollapsibleCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
