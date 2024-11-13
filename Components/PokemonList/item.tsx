import ColorScheme from "@/theme"
import { Link } from "expo-router"
import { Text, ColorSchemeName, StyleSheet, useColorScheme, View, Button } from "react-native"

type Props = {
    title: string,
    type: string,
}

const Item: React.FC<Props> = ({title, type}: Props) => {

    const colorScheme = useColorScheme();

    const onPress = (pokemonType: string) => {

    }

    return (
        <View style={createStyles(colorScheme).container}>
            <Text style={createStyles(colorScheme).text} >{title}</Text>
            <Link href={`/pokemon/${type}`} asChild >
                <Button onPress={() => {}} title='>'/>
            </Link>
        </View>
    )
}

export default Item

const createStyles = (colorSchemeName: ColorSchemeName) => {

    const colors = ColorScheme(colorSchemeName)
    return StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
    text: {
        color: colors.text,
      },
    });
  }
  