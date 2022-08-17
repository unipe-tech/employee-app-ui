import React from "react";
import renderer from "react-test-renderer";
import PrimaryButton from "../components/PrimaryButton";
import DateEntry from "../components/DateEntry";

describe("PrimaryButton", () => {
  test("if button renders correctly", () => {
    const tree = renderer.create(<PrimaryButton />).toJSON;
    expect(tree).toMatchSnapshot();
  });
});

describe("DateEntry", () => {
  test("if DateEntry renders correctly", () => {
    const tree = renderer.create(<DateEntry />).toJSON;
    expect(tree).toMatchSnapshot();
  });
});
