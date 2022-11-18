import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import MessageCard from "../../../components/atoms/MessageCard";
import { useNavigation } from "@react-navigation/core";

describe("MessageCard", () => {
  const mockedNavigate = jest.fn();
  test("renders UI correctly", () => {
    jest.mock("@react-navigation/core", () => ({
      useNavigation: () => ({ navigate: mockedNavigate }),
    }));
    const tree = render(<MessageCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
