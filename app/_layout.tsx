import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import ColorScheme from "./theme";

export default function RootLayout() {
  const colors = ColorScheme(useColorScheme())
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
  )
}
