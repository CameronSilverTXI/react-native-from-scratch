import { View, StyleSheet, useColorScheme, ColorSchemeName } from "react-native";
import ColorScheme from "@/theme";
import { useLocalSearchParams } from "expo-router";
import PokemonList from "@/Components/PokemonList";

const Pokemon: React.FC = () => {
  const { type } = useLocalSearchParams();

  const colorScheme = useColorScheme();

  return (
    <View style={createStyles(colorScheme).container}>
      <PokemonList type={`${type}`} />
    </View>
  );
}

export default Pokemon;

const createStyles = (colorSchemeName: ColorSchemeName) => {

  const colors = ColorScheme(colorSchemeName)
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
}
