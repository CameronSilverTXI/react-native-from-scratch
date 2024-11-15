import { Image, StyleSheet, View } from "react-native"

type Props = {
    url?: string
}

const SpriteComponent: React.FC<Props> = ({url}: Props) => {

    if (!url) {
        return null
    }

    return (
        <View style={styles.container}>
            <Image
                source={{uri: url}}
                width={100}
                height={100}
                resizeMethod="scale"
            />
        </View>
    )
}

export default SpriteComponent

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 15,
    },
});
