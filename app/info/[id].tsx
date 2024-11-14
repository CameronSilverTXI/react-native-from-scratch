import { Stack, useLocalSearchParams } from "expo-router";
import PokemonInfo from "@/Components/PokemonInfo";
import { useEffect, useState } from "react";
import ColorScheme from "@/theme";
import _ from "lodash";
import { ColorSchemeName, StyleSheet, useColorScheme, View } from "react-native";

const Info: React.FC = () => {
  const [title, setTitle] = useState<string>("")
  const { id } = useLocalSearchParams();

  const colorScheme = useColorScheme();

  useEffect(() => {
    setTitle("Loading...")
  }, [])

  return (
    <View style={createStyles(colorScheme).container}>
        <Stack.Screen options={{title: title}} />
        <PokemonInfo id={`${id}`} updateTitle={(typeName) => setTitle(_.startCase(typeName))} />
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
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
  });
}
