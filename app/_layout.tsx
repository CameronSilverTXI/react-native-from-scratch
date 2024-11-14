import { Stack } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";
import ColorScheme from "@/theme";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const colors = ColorScheme(useColorScheme())

  // Setup the ReactQuery client.
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.safeArea}>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
