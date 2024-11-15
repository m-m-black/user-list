import { View, Text, StyleSheet, FlatList, useColorScheme } from "react-native";
import { gql, useQuery } from "@apollo/client";

import UserListItem from "./UserListItem";

import { UserRole } from "@/constants/UserRole";
import { Colors } from "@/constants/Colors";

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
  const theme = useColorScheme() ?? "light";

  // Set query filter based on selectedRole
  const roleFilter = selectedRole ? { role: { eq: selectedRole } } : null;

  // Define query for data fetching (and re-fetching) with filter
  const { loading, error, data } = useQuery(LIST_ZELLER_CUSTOMERS, {
    variables: { filter: roleFilter, limit: 10 },
  });

  // Custom styles based on device theme (light or dark)
  const themedStyles = {
    statusText: {
      color: theme === "light" ? Colors.light.text : Colors.dark.text,
    },
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.statusContainer}>
          <Text style={themedStyles.statusText}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.statusContainer}>
          <Text style={themedStyles.statusText}>Error: {error.message}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
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
