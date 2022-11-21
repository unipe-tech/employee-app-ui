import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import TermsAndPrivacyModal from "../../../components/molecules/TermsAndPrivacyModal";

describe("TermsAndPrivacyModal", () => {
  test("renders UI correctly", () => {
    const tree = render(<TermsAndPrivacyModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
