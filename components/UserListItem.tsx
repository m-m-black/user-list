import { View, StyleSheet } from "react-native";
import { ListItem, Avatar } from "@rneui/themed";

type UserListItemProps = {
  name: string;
  role: string;
};

export default function UserListItem({ name, role }: UserListItemProps) {
  const avatarLabel = name[0].toUpperCase();

  return (
    <View style={styles.container}>
      <ListItem>
        <Avatar
          size={40}
          title={avatarLabel}
          containerStyle={styles.avatarContainer}
          titleStyle={styles.avatarText}
        />
        <ListItem.Content>
          <ListItem.Title>{name}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitleText}>
            {role}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "linen",
  },
  avatarContainer: {
    backgroundColor: "#EAF2FA",
    borderRadius: 5,
  },
  avatarText: {
    color: "#306FC7",
  },
  subtitleText: {
    color: "grey",
  },
});
