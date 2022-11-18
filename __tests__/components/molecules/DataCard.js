import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import DataCard from "../../../components/molecules/DataCard";

describe("DataCard", () => {
  test("renders UI correctly", () => {
    const tree = render(<DataCard data="Testing Data" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
