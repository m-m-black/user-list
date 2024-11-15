import { View, StyleSheet, useColorScheme } from "react-native";
import { ListItem, Avatar } from "@rneui/themed";

import {
  Colors,
  avatarBackground,
  avatarText,
  avatarSubtitleText,
} from "@/constants/Colors";

type UserListItemProps = {
  name: string;
  role: string;
};

export default function UserListItem({ name, role }: UserListItemProps) {
  const theme = useColorScheme() ?? "light";

  const avatarLabel = name[0].toUpperCase();

  // Custom styles based on device theme (light or dark)
  const themedStyles = {
    container: {
      backgroundColor:
        theme === "light" ? Colors.light.background : Colors.dark.background,
    },
    titleText: {
      color: theme === "light" ? Colors.light.text : Colors.dark.text,
    },
  };

  return (
    <View>
      <ListItem containerStyle={themedStyles.container}>
        <Avatar
          size={40}
          title={avatarLabel}
          containerStyle={styles.avatarContainer}
          titleStyle={styles.avatarText}
        />
        <ListItem.Content>
          <ListItem.Title style={themedStyles.titleText}>{name}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitleText}>
            {role}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: avatarBackground,
    borderRadius: 5,
  },
  avatarText: {
    color: avatarText,
  },
  subtitleText: {
    color: avatarSubtitleText,
  },
});
