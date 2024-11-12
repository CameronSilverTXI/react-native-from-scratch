import { View, StyleSheet, useColorScheme, ColorSchemeName } from "react-native";
import ColorScheme from "./theme";
import PokemonTypes from "./Components/PokemonTypes";

export default function Index() {

  const colorScheme = useColorScheme();

  return (
    <View style={createStyles(colorScheme).container}>
        <PokemonTypes/>
    </View>
  );
}

const createStyles = (colorSchemeName: ColorSchemeName) => {

  const colors = ColorScheme(colorSchemeName)
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
}
