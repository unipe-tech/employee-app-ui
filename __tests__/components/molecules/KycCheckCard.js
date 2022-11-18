import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import KycCheckCard from "../../../components/molecules/KycCheckCard";

describe("KycCheckCard", () => {
  test("renders UI correctly", () => {
    const tree = render(<KycCheckCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
