import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
  screenOptions={{
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}>
  <Stack.Screen name="index" options={{title: "Inicio"}} />
  <Stack.Screen name="[id]" options={{title: "Detalles"}} />
  <Stack.Screen name="addTeam" options={{title: "Nuevo Equipo"}} />
</Stack>
}
