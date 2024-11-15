import { StyleSheet, useColorScheme } from "react-native";
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
import { Colors } from "@/constants/Colors";

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
  const theme = useColorScheme() ?? "light";

  // Custom styles based on device theme (light or dark)
  const themedStyles = {
    sectionTitleText: {
      color: theme === "light" ? Colors.light.text : Colors.dark.text,
    },
  };

  return (
    <ApolloProvider client={client}>
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor:
              theme === "light"
                ? Colors.light.background
                : Colors.dark.background,
          },
        ]}
      >
        <Divider style={styles.divider} />
        <Text h3 style={[styles.sectionTitle, themedStyles.sectionTitleText]}>
          User Types
        </Text>
        <UserTypeFilter
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <Divider style={styles.divider} />
        <Text h3 style={[styles.sectionTitle, themedStyles.sectionTitleText]}>
          All Users
        </Text>
        <UserList selectedRole={selectedRole} />
        <Divider style={styles.divider} />
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    paddingLeft: 15,
  },
  divider: {
    margin: 20,
  },
});
