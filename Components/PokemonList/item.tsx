import ColorScheme from "@/theme"
import { Link } from "expo-router"
import { Text, ColorSchemeName, StyleSheet, useColorScheme, View, Button, TouchableNativeFeedback } from "react-native"

type Props = {
    title: string,
    id: string,
}

const Item: React.FC<Props> = ({title, id}: Props) => {

    const colorScheme = useColorScheme();

    return (
        <Link href={`/info/${id}`} asChild >
            <TouchableNativeFeedback>
                <View style={createStyles(colorScheme).container}>
                    <Text style={createStyles(colorScheme).text} >{title}</Text>
                    <Text style={createStyles(colorScheme).text} >{">"}</Text>
                </View>
            </TouchableNativeFeedback>
        </Link>
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
        paddingVertical: 15,
      },
    text: {
        color: colors.text,
      },
    });
  }
  