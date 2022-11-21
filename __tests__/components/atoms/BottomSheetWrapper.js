import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, test } from "@jest/globals";
import BottomSheetWrapper from "../../../components/atoms/BottomSheetWrapper";

describe("BottomSheetWrapper", () => {
  test("renders UI correctly", () => {
    const tree = render(
      <BottomSheetWrapper>Test Children</BottomSheetWrapper>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// const mockChildComponent = jest.fn();
// jest.mock("./ChildComponent", () => (props) => {
//   mockChildComponent(props);
//   return <mock-childComponent />;
// });

// test("If ParentComponent is passed open and has data, ChildComponent is called with prop open and data", () => {
//   render(<ParentComponent open data="some data" />);
//   expect(mockChildComponent).toHaveBeenCalledWith(
//     expect.objectContaining({
//       open: true,
//       data: "some data",
//     })
//   );
// });

// test("If ParentComponent is not passed open, ChildComponent is not called", () => {
//   render(<ParentComponent />);
//   expect(mockChildComponent).not.toHaveBeenCalled();
// });
