import { View, StyleSheet } from "react-native";
import { CheckBox } from "@rneui/themed";

import { UserRole } from "@/constants/UserRole";

type UserTypeFilterProps = {
  selectedRole: UserRole | undefined;
  setSelectedRole: (role: UserRole | undefined) => void;
};

export default function UserTypeFilter({
  selectedRole,
  setSelectedRole,
}: UserTypeFilterProps) {
  const toggleFilter = (role: UserRole) => {
    if (selectedRole === role) {
      setSelectedRole(undefined);
    } else {
      setSelectedRole(role);
    }
  };

  return (
    <View>
      <CheckBox
        checked={selectedRole === UserRole.ADMIN}
        onPress={() => toggleFilter(UserRole.ADMIN)}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        title="Admin"
        containerStyle={[
          styles.container,
          selectedRole === UserRole.ADMIN && styles.containerSelected,
        ]}
        checkedColor="#306FC7"
      />
      <CheckBox
        checked={selectedRole === UserRole.MANAGER}
        onPress={() => toggleFilter(UserRole.MANAGER)}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        title="Manager"
        containerStyle={[
          styles.container,
          selectedRole === UserRole.MANAGER && styles.containerSelected,
        ]}
        checkedColor="#306FC7"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
  containerSelected: {
    backgroundColor: "#EAF2FA",
  },
});
