import React, { useState } from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/client/testing";

import UserTypeFilter from "@/components/UserTypeFilter";
import UserList from "@/components/UserList";
import { LIST_ZELLER_CUSTOMERS } from "@/components/UserList";

import { UserRole } from "@/constants/UserRole";

const testCustomers = [
  {
    id: "1",
    name: "TestCustomer1",
    email: "test1@test.com",
    role: "Manager",
  },
  {
    id: "2",
    name: "TestCustomer2",
    email: "test2@test.com",
    role: "Admin",
  },
  {
    id: "3",
    name: "TestCustomer3",
    email: "test3@test.com",
    role: "Manager",
  },
  {
    id: "4",
    name: "TestCustomer4",
    email: "test4@test.com",
    role: "Admin",
  },
];

// Wrapper component to handle selectedRole state
const TestWrapper = ({
  initialRole = undefined,
}: {
  initialRole: UserRole | undefined;
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(
    initialRole
  );

  return (
    <>
      <UserTypeFilter
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
      <UserList selectedRole={selectedRole} />
    </>
  );
};

// All components used from React Native Elements are mocked.
// See __mocks__/@rneui/themed.js
jest.mock("@rneui/themed");

describe("UserList", () => {
  const mocks = [
    // Mock for all customers (no filter applied)
    {
      request: {
        query: LIST_ZELLER_CUSTOMERS,
        variables: { filter: null, limit: 10 },
      },
      result: {
        data: {
          listZellerCustomers: {
            items: testCustomers,
            nextToken: null,
          },
        },
      },
    },
    // Mock for Admin filter
    {
      request: {
        query: LIST_ZELLER_CUSTOMERS,
        variables: {
          filter: { role: { eq: UserRole.ADMIN } },
          limit: 10,
        },
      },
      result: {
        data: {
          listZellerCustomers: {
            items: testCustomers.filter((c) => c.role === "Admin"),
            nextToken: null,
          },
        },
      },
    },
    // Mock for Manager filter
    {
      request: {
        query: LIST_ZELLER_CUSTOMERS,
        variables: {
          filter: { role: { eq: UserRole.MANAGER } },
          limit: 10,
        },
      },
      result: {
        data: {
          listZellerCustomers: {
            items: testCustomers.filter((c) => c.role === "Manager"),
            nextToken: null,
          },
        },
      },
    },
  ];

  test("shows all users initially and filters to Admin users when Admin is selected", async () => {
    const { getByText, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TestWrapper initialRole={undefined} />
      </MockedProvider>
    );

    // Initially should show loading state
    expect(getByText("Loading...")).toBeTruthy();

    // Wait for initial data to load
    await waitFor(() => {
      expect(queryByText("Loading...")).toBeNull();
    });

    // Should show all users initially
    expect(getByText("TestCustomer1")).toBeTruthy();
    expect(getByText("TestCustomer2")).toBeTruthy();
    expect(getByText("TestCustomer3")).toBeTruthy();
    expect(getByText("TestCustomer4")).toBeTruthy();

    // Click Admin radio button
    const adminButton = getByText("◯ Admin");

    act(() => {
      fireEvent.press(adminButton);
    });

    // Should show loading state again
    expect(getByText("Loading...")).toBeTruthy();

    // Wait for filtered data to load
    await waitFor(() => {
      expect(queryByText("Loading...")).toBeNull();
    });

    // Should only show Admin users
    expect(queryByText("TestCustomer1")).toBeNull(); // Manager
    expect(getByText("TestCustomer2")).toBeTruthy(); // Admin
    expect(queryByText("TestCustomer3")).toBeNull(); // Manager
    expect(getByText("TestCustomer4")).toBeTruthy(); // Admin
  });

  test("shows only Manager users when Manager is selected", async () => {
    const { getByText, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TestWrapper initialRole={undefined} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText("Loading...")).toBeNull();
    });

    // Click Manager radio button
    const managerButton = getByText("◯ Manager");

    act(() => {
      fireEvent.press(managerButton);
    });

    // Wait for filtered data to load
    await waitFor(() => {
      expect(queryByText("Loading...")).toBeNull();
    });

    // Should only show Manager users
    expect(getByText("TestCustomer1")).toBeTruthy(); // Manager
    expect(queryByText("TestCustomer2")).toBeNull(); // Admin
    expect(getByText("TestCustomer3")).toBeTruthy(); // Manager
    expect(queryByText("TestCustomer4")).toBeNull(); // Admin
  });

  test("shows all users again when selected role is cleared", async () => {
    const { getByText, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TestWrapper initialRole={UserRole.ADMIN} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText("Loading...")).toBeNull();
    });

    // Initially should only show Admin users
    expect(queryByText("TestCustomer1")).toBeNull(); // Manager
    expect(getByText("TestCustomer2")).toBeTruthy(); // Admin
    expect(queryByText("TestCustomer3")).toBeNull(); // Manager
    expect(getByText("TestCustomer4")).toBeTruthy(); // Admin

    // Click Admin radio button again to clear
    const adminButton = getByText("⚫ Admin");

    act(() => {
      fireEvent.press(adminButton);
    });

    // Wait for unfiltered data to load
    await waitFor(() => {
      expect(queryByText("Loading...")).toBeNull();
    });

    // Should show all users
    expect(getByText("TestCustomer1")).toBeTruthy();
    expect(getByText("TestCustomer2")).toBeTruthy();
    expect(getByText("TestCustomer3")).toBeTruthy();
    expect(getByText("TestCustomer4")).toBeTruthy();
  });

  // Snapshot test to ensure UI remains consistent
  test("it renders correctly", () => {
    const tree = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TestWrapper initialRole={UserRole.ADMIN} />
      </MockedProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
