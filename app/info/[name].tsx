import { View, StyleSheet, useColorScheme, ColorSchemeName, Text } from "react-native";
import ColorScheme from "@/theme";
import { Stack, useLocalSearchParams } from "expo-router";

const Info: React.FC = () => {
  const { name } = useLocalSearchParams();

  const colorScheme = useColorScheme();

  return (
    <View style={createStyles(colorScheme).container}>
        <Stack.Screen options={{title: `${name}`}} />
        <Text style={createStyles(colorScheme).text}>Info for: {name}</Text>
    </View>
  );
}

export default Info;

const createStyles = (colorSchemeName: ColorSchemeName) => {

  const colors = ColorScheme(colorSchemeName)
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors.text,
    },
});
}
