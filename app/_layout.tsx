import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import ColorScheme from "@/theme";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function RootLayout() {
  const colors = ColorScheme(useColorScheme())

  // Setup the ReactQuery client.
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}
