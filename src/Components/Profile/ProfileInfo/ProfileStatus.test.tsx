import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="staus test text" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("staus test text");
  });
  test("after creation <span> should de displayed ", () => {
    const component = create(<ProfileStatus status="status test text" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span).not.toBeNull();
  });
  test("after creation <input> shouldn't de displayed ", () => {
    const component = create(<ProfileStatus status="status test text" />);
    const root = component.root;
    expect(() => {
      const input = root.findByType("input");
    }).toThrow();
  });
  test("after creation <span> should contain correct status", () => {
    const component = create(<ProfileStatus status="status test text" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span.children[0]).toBe("status test text");
  });
  test("<input> should be displayed in editMode insteat <span>", () => {
    const component = create(<ProfileStatus status="status test text" />);
    const root = component.root;
    const span = root.findByType("span");
    span.props.onDoubleClick();
    const input = root.findByType("input");
    expect(input.props.value).toBe("status test text");
  });
  test("callback schould be called", () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatus status="status test text" updateStatus={mockCallback} />
    );
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
