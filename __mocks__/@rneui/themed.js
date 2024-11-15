/**
 * Components from React Native Elements (@rneui/themed) had to be mocked
 * in order for them to work with the tests.
 * This file contains those mocks.
 */

const { Text, View } = require("react-native");

module.exports = {
  Text: (props) => <Text {...props} />,

  Divider: (props) => (
    <View
      {...props}
      style={[{ height: 1, backgroundColor: "#e0e0e0" }, props?.style]}
    />
  ),

  Avatar: (props) => (
    <View {...props}>
      {props.title && <Text>{props.title}</Text>}
      {props.source && <View style={{ width: 40, height: 40 }} />}
    </View>
  ),

  CheckBox: (props) => (
    <View {...props}>
      <Text>
        {props.checked ? "⚫" : "◯"} {props.title}
      </Text>
    </View>
  ),

  ListItem: Object.assign((props) => <View {...props} />, {
    Content: (props) => <View {...props} />,
    Title: (props) => <Text {...props} />,
    Subtitle: (props) => <Text {...props} />,
  }),
};
