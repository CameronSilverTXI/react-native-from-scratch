import ColorScheme from "@/theme"
import { Link } from "expo-router"
import { Text, ColorSchemeName, StyleSheet, useColorScheme, View, TouchableNativeFeedback } from "react-native"

type Props = {
    title: string,
    type: string,
}

const Item: React.FC<Props> = ({title, type}: Props) => {

    const colorScheme = useColorScheme()
    const styles = createStyles(colorScheme)

    return (
        <Link href={`/type/${type}`} asChild >
            <TouchableNativeFeedback>
                <View style={styles.container}>
                    <Text style={styles.text} >{title}</Text>
                    <Text style={styles.text} >{">"}</Text>
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
  