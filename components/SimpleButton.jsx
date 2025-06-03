import { TouchableOpacity, Text } from 'react-native'

const SimpleButton = ({ onPress, label, disabled }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={
                disabled
                    ? 'bg-gray-800 p-4 rounded-lg w-full items-center'
                    : 'bg-black p-4 rounded-lg w-full items-center'
            }
            activeOpacity={0.7}
            disabled={disabled}
        >
            <Text className='text-xl font-bold text-white'>{label}</Text>
        </TouchableOpacity>
    )
}

export default SimpleButton
