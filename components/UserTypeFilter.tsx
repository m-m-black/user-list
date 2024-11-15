import { View, StyleSheet, useColorScheme } from "react-native";
import { CheckBox } from "@rneui/themed";

import { UserRole } from "@/constants/UserRole";
import { Colors } from "@/constants/Colors";

type UserTypeFilterProps = {
  selectedRole: UserRole | undefined;
  setSelectedRole: (role: UserRole | undefined) => void;
};

export default function UserTypeFilter({
  selectedRole,
  setSelectedRole,
}: UserTypeFilterProps) {
  const theme = useColorScheme() ?? "light";

  // This function allows each filter button to be selected and unselected
  const toggleFilter = (role: UserRole) => {
    if (selectedRole === role) {
      setSelectedRole(undefined);
    } else {
      setSelectedRole(role);
    }
  };

  // Custom styles based on device theme (light or dark)
  const themedStyles = {
    checkedColor: {
      color:
        theme === "light"
          ? Colors.light.tabIconSelected
          : Colors.dark.tabIconSelected,
    },
    container: {
      backgroundColor:
        theme === "light" ? Colors.light.background : Colors.dark.background,
    },
    selectedContainer: {
      backgroundColor:
        theme === "light"
          ? Colors.light.backgroundSecondary
          : Colors.dark.backgroundSecondary,
    },
    text: {
      color: theme === "light" ? Colors.light.text : Colors.dark.text,
    },
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
          themedStyles.container,
          selectedRole === UserRole.ADMIN && themedStyles.selectedContainer,
        ]}
        textStyle={themedStyles.text}
        checkedColor={themedStyles.checkedColor.color}
      />
      <CheckBox
        checked={selectedRole === UserRole.MANAGER}
        onPress={() => toggleFilter(UserRole.MANAGER)}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        title="Manager"
        containerStyle={[
          styles.container,
          themedStyles.container,
          selectedRole === UserRole.MANAGER && themedStyles.selectedContainer,
        ]}
        textStyle={themedStyles.text}
        checkedColor={themedStyles.checkedColor.color}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
});
