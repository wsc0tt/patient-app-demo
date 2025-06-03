import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import '../global.css'
import { SafeAreaView } from 'react-native-safe-area-context'
import SimpleButton from '../components/SimpleButton'
import { router } from 'expo-router'

export default function Home() {
    return (
        <View className='flex-1 bg-white justify-center items-center max-w-screen max-h-screen'>
            <View className='flex-1 items-center justify-center p-4 w-full'>
                <Text className='text-2xl font-bold mb-2'>Nanu App Demo</Text>
                <Text className='text-black text-center text-lg mb-4'>
                    Choose a user type to explore features:
                </Text>
                <View className='items-center gap-4 justify-center w-full'>
                    <SimpleButton
                        label='Patient'
                        onPress={() => router.push('/patient')}
                    />
                    <SimpleButton
                        label='Expert'
                        onPress={() => router.push('/expert')}
                    />
                </View>
            </View>
        </View>
    )
}
