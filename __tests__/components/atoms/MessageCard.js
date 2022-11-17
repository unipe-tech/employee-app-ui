import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import MessageCard from "../../../components/atoms/MessageCard";

describe("MessageCard", () => {
  test("renders UI correctly", () => {
    const tree = render(<MessageCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
