import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Checkbox from './Checkbox'

const Collapsible = ({
    isOpen,
    onToggle,
    children,
    title,
    checked,
    onCheck,
}) => {
    return (
        <View className='w-full'>
            <View className='flex-row gap-2'>
                <TouchableOpacity
                    onPress={onToggle}
                    className='bg-gray-100 rounded-lg shadow-md flex-start items-center justify-center px-4 py-2 my-1'
                >
                    <Text>
                        <Ionicons
                            name={isOpen ? 'chevron-down' : 'chevron-forward'}
                            size={18}
                            color='teal'
                        />
                    </Text>
                </TouchableOpacity>
                <Checkbox label={title} checked={checked} onToggle={onCheck} />
            </View>
            {isOpen && <View className='ml-[55px]'>{children}</View>}
        </View>
    )
}

export default Collapsible
