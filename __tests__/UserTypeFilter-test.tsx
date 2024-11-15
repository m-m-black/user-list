import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import UserTypeFilter from "@/components/UserTypeFilter";

import { UserRole } from "@/constants/UserRole";

// All components used from React Native Elements are mocked.
// See __mocks__/@rneui/themed.js
jest.mock("@rneui/themed");

describe("UserTypeFilter", () => {
  test("Admin radio button is selected when Admin role is selected", () => {
    const mockSetSelectedRole = jest.fn();

    const { getByText } = render(
      <UserTypeFilter
        selectedRole={UserRole.ADMIN}
        setSelectedRole={mockSetSelectedRole}
      />
    );

    // Confirm the Admin radio is selected
    const adminButton = getByText("⚫ Admin");
    expect(adminButton).toBeTruthy();

    // Confirm the Manager radio is unselected
    const managerButton = getByText("◯ Manager");
    expect(managerButton).toBeTruthy();
  });

  test("clicking Admin radio calls setSelectedRole with correct value", () => {
    const mockSetSelectedRole = jest.fn();

    const { getByText } = render(
      <UserTypeFilter
        selectedRole={undefined}
        setSelectedRole={mockSetSelectedRole}
      />
    );

    const adminButton = getByText("◯ Admin");
    fireEvent.press(adminButton);

    expect(mockSetSelectedRole).toHaveBeenCalledWith(UserRole.ADMIN);
  });

  test("clicking Admin radio when already selected clears selection", () => {
    const mockSetSelectedRole = jest.fn();

    const { getByText } = render(
      <UserTypeFilter
        selectedRole={UserRole.ADMIN}
        setSelectedRole={mockSetSelectedRole}
      />
    );

    const adminButton = getByText("⚫ Admin");
    fireEvent.press(adminButton);

    expect(mockSetSelectedRole).toHaveBeenCalledWith(undefined);
  });

  // Snapshot test to ensure UI remains consistent
  test("it renders correctly", () => {
    const mockSetSelectedRole = jest.fn();
    const tree = render(
      <UserTypeFilter
        selectedRole={UserRole.ADMIN}
        setSelectedRole={mockSetSelectedRole}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
