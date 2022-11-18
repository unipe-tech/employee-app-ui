import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import HomeOfferCard from "../../../components/molecules/HomeOfferCard";

describe("HomeOfferCard", () => {
  test("renders UI correctly", () => {
    const tree = render(<HomeOfferCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
