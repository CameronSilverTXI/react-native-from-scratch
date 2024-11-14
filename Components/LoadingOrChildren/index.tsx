import ColorScheme from "@/theme"
import { ReactElement } from "react"
import { ActivityIndicator, ColorSchemeName, Text, useColorScheme, View } from "react-native"
import { StyleSheet } from "react-native"

type Props = {
    isLoading: boolean
    overrideMessage?: string
    children: ReactElement
}

const LoadingOrChildren: React.FC<Props> = ({isLoading, overrideMessage, children}: Props) => {
    const colorScheme = useColorScheme();
    const styles = createStyles(colorScheme)

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        )
    }

    if (overrideMessage) {
        return (
        <View style={styles.container}>
            <Text style={styles.text}>{overrideMessage}</Text>
        </View>
        )
    }

    return children
}

export default LoadingOrChildren

const createStyles = (colorSchemeName: ColorSchemeName) => {

    const colors = ColorScheme(colorSchemeName)
    return StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'center',
            width: "100%",
            height: "100%",
            paddingHorizontal: 10,
        },
        text: {
            color: colors.text,
            textAlign: 'center',
            },
        });
}
