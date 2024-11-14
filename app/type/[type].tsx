import { View, StyleSheet, useColorScheme, ColorSchemeName } from "react-native";
import ColorScheme from "@/theme";
import { Stack, useLocalSearchParams } from "expo-router";
import PokemonList from "@/Components/PokemonList";
import { useEffect, useState } from "react";
import _ from "lodash";

const Pokemon: React.FC = () => {
  const [title, setTitle] = useState<string>("")
  const { type } = useLocalSearchParams();

  const colorScheme = useColorScheme();

  useEffect(() => {
    setTitle("Loading...")
  }, [])

  return (
    <View style={createStyles(colorScheme).container}>
        <Stack.Screen options={{title: title}} />
        <PokemonList type={`${type}`} updateTitle={(typeName) => setTitle(`${_.startCase(typeName)} Pokémon`)} />
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
