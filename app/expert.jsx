import { Text, View } from 'react-native'
import '../global.css'
import PatientList from '../components/PatientList'
import { router } from 'expo-router'

const Expert = () => {
    return (
        <View className='flex-1 bg-white max-w-screen max-h-screen'>
            <View className='flex-1 items-center gap-4 justify-center p-4'>
                <Text className='text-2xl font-bold'>Patient List</Text>
                <View className='w-full bg-gray-300 rounded-lg p-4'>
                    <PatientList />
                </View>
            </View>
        </View>
    )
}

export default Expert
