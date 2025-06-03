import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text } from 'react-native'
import '../global.css'
import { getPatient } from '../services/patientService'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const Info = () => {
    const { patientId } = useLocalSearchParams()
    const [patient, setPatient] = useState(null)

    useEffect(() => {
        fetchPatient()
    }, [patientId])

    const fetchPatient = async () => {
        try {
            const data = await getPatient(patientId)
            setPatient(data)
        } catch (error) {
            console.error('Error fetching patient data:', error)
        }
    }

    if (!patient) {
        return <Text>Loading Patient Data...</Text>
    }

    const settingsString = JSON.stringify(patient.settings, null, 2)
        .slice(1, -1)
        .trim()
        .replace(/"/g, '')
        .replace(/[{}[\]]/g, '') // Remove brackets
        .replace(/^\s+/gm, '') // Remove leading spaces from each line
        .replace(/,$/gm, '')

    return (
        <SafeAreaView className='flex-1' edges={['bottom']}>
            <ScrollView
                contentContainerStyle={{
                    minHeight: '100%',
                    justifyContent: 'center',
                }}
            >
                <View className='flex-1 p-4'>
                    <Text className='text-2xl font-bold mb-3'>
                        {patient.name}
                    </Text>
                    <Text className='text-lg font-bold'>ID:</Text>
                    <Text className='mb-1'>{patient.id}</Text>
                    <Text className='text-lg font-bold'>Settings:</Text>
                    <Text>{settingsString}</Text>
                    <Text className='text-lg font-bold'>Logs:</Text>
                    <Text>{patient.selected_date}</Text>
                    <Text>{patient.log}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Info
