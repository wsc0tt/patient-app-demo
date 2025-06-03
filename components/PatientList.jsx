import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { getAllPatients } from '../services/patientService'
import '../global.css'
import { router } from 'expo-router'

const PatientList = () => {
    const [patients, setPatients] = useState([])

    useEffect(() => {
        fetchPatients()
    }, [])
    const fetchPatients = async () => {
        try {
            const data = await getAllPatients()
            setPatients(data)
        } catch (error) {
            console.error('Error fetching patients:', error)
        }
    }

    const handlePress = (patient) => {
        console.log('Pressed patient:', patient)

        router.push(`/info?patientId=${patient.id}`)
    }

    return (
        <FlatList
            data={patients}
            keyExtractor={(item) => item.id.toString()}
            contentContainerClassName='gap-2'
            renderItem={({ item }) => (
                <TouchableOpacity
                    className='p-4 bg-gray-200 rounded-lg shadow-sm'
                    onPress={() => handlePress(item)}
                >
                    <Text className='text-lg font-semibold'>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
    )
}

export default PatientList
