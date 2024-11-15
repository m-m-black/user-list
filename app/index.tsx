import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Text, Divider } from "@rneui/themed";

import UserTypeFilter from "@/components/UserTypeFilter";
import UserList from "@/components/UserList";

import { UserRole } from "@/constants/UserRole";
import { AWS_APPSYNC_URL, AWS_APPSYNC_API_KEY } from "@/constants/aws-config";

// Create HTTP link to AppSync URL
const httpLink = new HttpLink({
  uri: AWS_APPSYNC_URL,
});

// Create Auth link with API key
const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    "x-api-key": AWS_APPSYNC_API_KEY,
  },
}));

// Initialize Apollo client with auth and URL defined above
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function HomeScreen() {
  // Define selectedRole here because it is passed down to two child components
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(
    undefined
  );

  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        <Divider style={{ margin: 20 }} />
        <Text h3 style={styles.sectionTitle}>
          User Types
        </Text>
        <UserTypeFilter
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <Divider style={{ margin: 20 }} />
        <Text h3 style={styles.sectionTitle}>
          All Users
        </Text>
        <UserList selectedRole={selectedRole} />
        <Divider style={{ margin: 20 }} />
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  sectionTitle: {
    paddingLeft: 15,
  },
});
