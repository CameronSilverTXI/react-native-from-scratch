import { Text, View, StyleSheet, useColorScheme, ColorSchemeName } from "react-native";
import ColorScheme from "./theme";

export default function Index() {

  const colorScheme = useColorScheme();

  return (
    <View style={createStyles(colorScheme).container}>
      <Text style={createStyles(colorScheme).text}>Hello TXI engineers!</Text>
    </View>
  );
}

const createStyles = (colorSchemeName: ColorSchemeName) => {

  const colors = ColorScheme(colorSchemeName)
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: colors.text,
    },
  });
}
