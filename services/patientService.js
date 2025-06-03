import { supabase } from '../config/supabase'

export const savePatient = async (patientData) => {
    const { data, error } = await supabase
        .from('patients')
        .insert({
            name: patientData.name,
            settings: patientData.checked, // JSONB handles objects directly
            selected_date: patientData.selectedDate,
            log: patientData.log,
        })
        .select()

    if (error) throw error
    return data[0]
}

export const updatePatient = async (id, patientData) => {
    const { data, error } = await supabase
        .from('patients')
        .update({
            name: patientData.name,
            settings: patientData.checked,
            selected_date: patientData.selectedDate,
            log: patientData.log,
            updated_at: new Date(),
        })
        .eq('id', id)
        .select()

    if (error) throw error
    return data[0]
}

export const getPatient = async (id) => {
    const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data
}

export const getAllPatients = async () => {
    const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('name', { ascending: true })

    if (error) throw error
    return data
}
