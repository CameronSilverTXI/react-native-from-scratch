import ColorScheme from "@/theme"
import { Text, ColorSchemeName, StyleSheet, useColorScheme, View } from "react-native"
import { DataValue } from ".";

type Props = {
    data: DataValue,
}

const ItemKeyValue: React.FC<Props> = ({data: {value}}: Props) => {

    const colorScheme = useColorScheme();

    return (
        <View style={createStyles(colorScheme).container}>
            <Text style={createStyles(colorScheme).text} >{value}</Text>
        </View>
    )
}

export default ItemKeyValue

const createStyles = (colorSchemeName: ColorSchemeName) => {

    const colors = ColorScheme(colorSchemeName)
    return StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
      },
    text: {
        color: colors.text,
      },
    });
  }
  