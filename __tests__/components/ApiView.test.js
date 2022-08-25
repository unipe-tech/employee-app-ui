import ApiView from "../../apis/ApiView";
import { render, fireEvent } from "@testing-library/react-native";
import { shallow } from "enzyme";
import { Button } from "@react-native-material/core";

describe("Test ApiView", () => {
  it("should render loading button on loading", () => {
    const component = render(
      <ApiView disabled={false} loading={true} goForFetch={jest.fn()} />
    );

    expect(component).toBeDefined();
    expect(component.getByText("Verifying")).toBeDefined();
  });

  it("should render Continue text in button on loading false", () => {
    const component = render(
      <ApiView disabled={false} loading={false} goForFetch={jest.fn()} />
    );

    expect(component).toBeDefined();
    expect(component.getByText("Continue")).toBeDefined();
  });

  it("should disable Verifying button on disabled true", () => {
    const component = render(
      <ApiView disabled={true} loading={true} goForFetch={jest.fn()} />
    );
    const wrapper = shallow(
      <ApiView disabled={true} loading={true} goForFetch={jest.fn()} />
    );

    expect(component).toBeDefined();
    expect(component.getByText("Verifying")).toBeDefined();
    expect(wrapper.find(Button)).toBeDisabled();
  });

  it("should disable Verifying button on loading true", () => {
    const component = render(
      <ApiView disabled={false} loading={true} goForFetch={jest.fn()} />
    );
    const wrapper = shallow(
      <ApiView disabled={false} loading={true} goForFetch={jest.fn()} />
    );

    expect(component).toBeDefined();
    expect(component.getByText("Verifying")).toBeDefined();
    expect(wrapper.find(Button)).toBeDisabled();
  });

  it("should not disable Continue button on disable and loading false", () => {
    const goForFetch = jest.fn();
    const component = render(
      <ApiView disabled={false} loading={false} goForFetch={goForFetch} />
    );
    const wrapper = shallow(
      <ApiView disabled={false} loading={false} goForFetch={goForFetch} />
    );

    expect(component).toBeDefined();
    expect(component.getByText("Continue")).toBeDefined();
    expect(wrapper.find(Button)).not.toBeDisabled();
    fireEvent.press(component.getByText("Continue"));
    expect(goForFetch).toHaveBeenCalled();
  });
});
