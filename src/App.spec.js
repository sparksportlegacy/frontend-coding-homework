import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "./../utils";
import App from "./App";

const setUp = (props = {}) => {
  return shallow(<App />);
};

describe("App Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without error", () => {
    const wrapper = findByTestAttr(component, "appComponent");
    expect(wrapper.length).toBe(1);
  });
});
