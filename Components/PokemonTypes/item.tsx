import ColorScheme from "@/theme"
import { Text, ColorSchemeName, StyleSheet, useColorScheme, View } from "react-native"

type Props = {
    title: string
}

const Item: React.FC<Props> = ({title}: Props) => {

    const colorScheme = useColorScheme();

    return (
        <View style={createStyles(colorScheme).container}>
            <Text style={createStyles(colorScheme).text} >{title}</Text>
        </View>
    )
}

export default Item

const createStyles = (colorSchemeName: ColorSchemeName) => {

    const colors = ColorScheme(colorSchemeName)
    return StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
    text: {
        color: colors.text,
      },
    });
  }
  