import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import InfoCard from "../../../components/atoms/InfoCard";

describe("InfoCard", () => {
  test("renders UI correctly", () => {
    const tree = render(<InfoCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
