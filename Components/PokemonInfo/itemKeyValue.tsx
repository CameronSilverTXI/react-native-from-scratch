import ColorScheme from "@/theme"
import { Text, ColorSchemeName, StyleSheet, useColorScheme, View } from "react-native"
import { DataKeyValue } from ".";

type Props = {
    data: DataKeyValue,
}

const ItemKeyValue: React.FC<Props> = ({data: {key, value}}: Props) => {

    const colorScheme = useColorScheme();

    return (
        <View style={createStyles(colorScheme).container}>
            <View style={createStyles(colorScheme).containerKey}>
                <Text style={createStyles(colorScheme).text} >{key}</Text>
            </View>
            <View style={createStyles(colorScheme).containerValue}>
                <Text style={createStyles(colorScheme).text} >{value}</Text>
            </View>
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
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
      },
    containerKey: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 15,
      },
    containerValue: {
        flex: 1,
        paddingLeft: 15,
      },
    text: {
        color: colors.text,
      },
    });
  }
  