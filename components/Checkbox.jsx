import { TouchableOpacity, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Checkbox = ({ label, checked, onToggle }) => {
    return (
        <TouchableOpacity
            className='flex-row items-center bg-gray-100 py-2 px-3 rounded-lg mr-auto shadow-md my-1'
            onPress={onToggle}
            activeOpacity={0.7}
        >
            <View className='w-5 h-5 border border-teal-600 rounded-full mr-2 items-center justify-center'>
                {checked && <Ionicons name='ellipse' size={12} color='teal' />}
            </View>
            <Text className='text-lg'>{label}</Text>
        </TouchableOpacity>
    )
}

export default Checkbox
