import { View, Text, StyleSheet, FlatList } from "react-native";
import { gql, useQuery } from "@apollo/client";

import UserListItem from "./UserListItem";

import { UserRole } from "@/constants/UserRole";

// TODO: Delete this
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

// Export this query to make it available it tests
export const LIST_ZELLER_CUSTOMERS = gql`
  query ListZellerCustomers(
    $filter: TableZellerCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listZellerCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        role
      }
      nextToken
    }
  }
`;

type UserListProps = {
  selectedRole: UserRole | undefined;
};

export default function UserList({ selectedRole }: UserListProps) {
  // Set query filter based on selectedRole
  const roleFilter = selectedRole ? { role: { eq: selectedRole } } : null;

  // Define query for data fetching (and re-fetching) with filter
  const { loading, error, data } = useQuery(LIST_ZELLER_CUSTOMERS, {
    variables: { filter: roleFilter, limit: 10 },
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.statusContainer}>
          <Text>Loading...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.statusContainer}>
          <Text>Error: {error.message}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        // data={testCustomers} // TODO: Delete this
        data={data.listZellerCustomers.items}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <UserListItem name={item.name} role={item.role} key={index} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  statusContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    flex: 1,
  },
});
