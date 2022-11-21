import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import OfflineAlert from "../../../components/organisms/OfflineAlert";

describe("OfflineAlert", () => {
  test("renders UI correctly", () => {
    const tree = render(<OfflineAlert />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
