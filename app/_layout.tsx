import { Stack } from "expo-router";
import { ColorSchemeName, StyleSheet, useColorScheme } from "react-native";
import ColorScheme from "@/theme";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const colors = ColorScheme(colorScheme)

  // Setup the ReactQuery client.
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={createStyles(colorScheme).safeArea}>
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
      </SafeAreaView>
    </QueryClientProvider>
  )
}

const createStyles = (colorSchemeName: ColorSchemeName) => {

  const colors = ColorScheme(colorSchemeName)
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
}
