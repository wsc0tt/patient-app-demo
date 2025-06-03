import { registerRootComponent } from 'expo'
import { ExpoRoot } from 'expo-router'

// Must be exported or you'll get an Expo Router error
export default function App() {
    const ctx = require.context('./app')
    return <ExpoRoot context={ctx} />
}

registerRootComponent(App)
