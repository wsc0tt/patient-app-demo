import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    animation: 'none',
                }}
            >
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name='home' options={{ title: 'Home' }} />
                <Stack.Screen
                    name='patient'
                    options={{ title: 'Patient Dashboard' }}
                />
                <Stack.Screen
                    name='expert'
                    options={{ title: 'Expert Dashboard' }}
                />
                <Stack.Screen
                    name='info'
                    options={{ title: 'Patient Information' }}
                />
            </Stack>
        </SafeAreaProvider>
    )
}
