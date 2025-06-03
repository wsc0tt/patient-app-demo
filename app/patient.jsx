import {
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import '../global.css'
import { useState } from 'react'
import Collapsible from '../components/Collapsible'
import SimpleButton from '../components/SimpleButton'
import Checkbox from '../components/Checkbox'
import FlashCalendar from '../components/FlashCalendar'
import { toDateId } from '@marceloterreiro/flash-calendar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { savePatient } from '../services/patientService'

const today = toDateId(new Date())

const Patient = () => {
    const insets = useSafeAreaInsets()
    const [log, setLog] = useState('')
    const [selectedDate, setSelectedDate] = useState(today)
    const [name, setName] = useState('')
    const [openSections, setOpenSections] = useState({
        settings: false,
        notifications: false,
        push: false,
        privacy: false,
        security: false,
        preferences: false,
        theme: false,
        language: false,
        regionalDialects: false,
        integrations: false,
        github: false,
        jira: false,
        advanced: false,
    })

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }

    const [checked, setChecked] = useState({
        settings: false,
        notifications: false,
        email: false,
        sms: false,
        push: false,
        android: false,
        ios: false,
        privacy: false,
        location: false,
        camera: false,
        microphone: false,
        security: false,
        twoFactorAuth: false,
        backupCodes: false,
        darkMode: false,
        highContrast: false,
        english: false,
        spanish: false,
        catalan: false,
        quechua: false,
        slack: false,
        issues: false,
        pullRequests: false,
        basic: false,
        advanced: false,
        integrations: false,
        theme: false,
        preferences: false,
        github: false,
        jira: false,
        workflows: false,
        automations: false,
    })

    const patientData = {
        name: name,
        settings: settingsJson, // Stored as JSON string
        selectedDate: selectedDate,
        log: log,
    }

    const settingsJson = JSON.stringify(checked)

    const checkboxHierarchy = {
        settings: ['notifications', 'privacy', 'security'],
        notifications: ['email', 'sms', 'push'],
        push: ['android', 'ios'],
        privacy: ['location', 'camera', 'microphone'],
        security: ['twoFactorAuth', 'backupCodes'],
        preferences: ['theme', 'language'],
        theme: ['darkMode', 'highContrast'],
        language: ['english', 'spanish', 'regionalDialects'],
        regionalDialects: ['catalan', 'quechua'],
        integrations: ['slack', 'github', 'jira'],
        github: ['issues', 'pullRequests'],
        jira: ['basic', 'advanced'],
        advanced: ['workflows', 'automations'],
    }

    const toggleCheckbox = (key) => {
        setChecked((prev) => {
            const newChecked = { ...prev, [key]: !prev[key] }

            // Function to get all descendants of a key
            const getAllDescendants = (parentKey, hierarchy) => {
                const descendants = []
                const collectDescendants = (key) => {
                    if (hierarchy[key]) {
                        hierarchy[key].forEach((child) => {
                            descendants.push(child)
                            collectDescendants(child)
                        })
                    }
                }
                collectDescendants(parentKey)
                return descendants
            }

            // Function to get all ancestors of a key
            const getAllAncestors = (childKey, hierarchy) => {
                const ancestors = []
                const findAncestors = (key) => {
                    Object.keys(hierarchy).forEach((parent) => {
                        if (hierarchy[parent].includes(key)) {
                            ancestors.push(parent)
                            findAncestors(parent)
                        }
                    })
                }
                findAncestors(childKey)
                return ancestors
            }

            // If the checkbox is a parent, toggle all its descendants
            if (checkboxHierarchy[key]) {
                const descendants = getAllDescendants(key, checkboxHierarchy)
                descendants.forEach((descendant) => {
                    newChecked[descendant] = newChecked[key]
                })
            }

            // Update ancestors based on children's state
            const ancestors = getAllAncestors(key, checkboxHierarchy)
            ancestors.forEach((ancestor) => {
                const children = checkboxHierarchy[ancestor]
                const allChildrenChecked = children.every(
                    (child) => newChecked[child]
                )
                newChecked[ancestor] = allChildrenChecked
            })

            return newChecked
        })
    }

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (name, checked) => {
        if (!name.trim()) {
            alert('Please enter a patient name.')
            return
        }

        setIsSubmitting(true)

        try {
            const patientData = {
                name,
                checked,
                selectedDate,
                log,
            }

            const savedPatient = await savePatient(patientData)
            console.log('Patient saved:', savedPatient)

            // Reset form on success
            setName('')
            setChecked({
                settings: false,
                notifications: false,
                email: false,
                sms: false,
                push: false,
                android: false,
                ios: false,
                privacy: false,
                location: false,
                camera: false,
                microphone: false,
                security: false,
                twoFactorAuth: false,
                backupCodes: false,
                preferences: false,
                theme: false,
                darkMode: false,
                highContrast: false,
                language: false,
                english: false,
                spanish: false,
                regionalDialects: false,
                catalan: false,
                quechua: false,
                integrations: false,
                slack: false,
                github: false,
                issues: false,
                pullRequests: false,
                jira: false,
                basic: false,
                advanced: false,
                workflows: false,
                automations: false,
            })
            setLog('')
        } catch (error) {
            console.error('Error saving patient:', error)
            alert('Failed to save patient data')
        } finally {
            setIsSubmitting(false)
        }
    }

    const [placeholderText, setPlaceholderText] = useState('Tap to enter name')

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, paddingBottom: insets.bottom }}
        >
            <ScrollView
                contentContainerStyle={{
                    minHeight: '100%',
                    justifyContent: 'center',
                }}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss()
                    }}
                >
                    <View className='flex-1 bg-white max-w-screen'>
                        <View className='flex-1 items-center justify-center p-4 gap-2 w-full'>
                            <Text className='text-2xl font-bold'>
                                Patient Name
                            </Text>
                            <TextInput
                                className='bg-gray-200 rounded-lg p-4 text-lg w-full text-center border-2 border-white focus:border-teal-500'
                                placeholder={placeholderText}
                                value={name}
                                onChangeText={setName}
                                onFocus={() =>
                                    setPlaceholderText('Enter patient name')
                                }
                                onBlur={() => {
                                    if (!name.trim()) {
                                        setPlaceholderText('Tap to enter name')
                                    }
                                }}
                            />
                            <Text className='text-2xl font-bold'>
                                Patient Settings
                            </Text>
                            <View className='w-full bg-gray-200 rounded-lg p-4'>
                                <Collapsible
                                    title='Settings'
                                    isOpen={openSections.settings}
                                    onToggle={() => toggleSection('settings')}
                                    checked={checked.settings}
                                    onCheck={() => toggleCheckbox('settings')}
                                >
                                    <Collapsible
                                        title='Notifications'
                                        isOpen={openSections.notifications}
                                        onToggle={() =>
                                            toggleSection('notifications')
                                        }
                                        checked={checked.notifications}
                                        onCheck={() =>
                                            toggleCheckbox('notifications')
                                        }
                                    >
                                        <Checkbox
                                            label='Email'
                                            checked={checked.email}
                                            onToggle={() =>
                                                toggleCheckbox('email')
                                            }
                                        />
                                        <Checkbox
                                            label='SMS'
                                            checked={checked.sms}
                                            onToggle={() =>
                                                toggleCheckbox('sms')
                                            }
                                        />
                                        <Collapsible
                                            title='Push'
                                            isOpen={openSections.push}
                                            onToggle={() =>
                                                toggleSection('push')
                                            }
                                            checked={checked.push}
                                            onCheck={() =>
                                                toggleCheckbox('push')
                                            }
                                        >
                                            <Checkbox
                                                label='Android'
                                                checked={checked.android}
                                                onToggle={() =>
                                                    toggleCheckbox('android')
                                                }
                                            />
                                            <Checkbox
                                                label='iOS'
                                                checked={checked.ios}
                                                onToggle={() =>
                                                    toggleCheckbox('ios')
                                                }
                                            />
                                        </Collapsible>
                                    </Collapsible>
                                    <Collapsible
                                        title='Privacy'
                                        isOpen={openSections.privacy}
                                        onToggle={() =>
                                            toggleSection('privacy')
                                        }
                                        checked={checked.privacy}
                                        onCheck={() =>
                                            toggleCheckbox('privacy')
                                        }
                                    >
                                        <Checkbox
                                            label='Location'
                                            checked={checked.location}
                                            onToggle={() =>
                                                toggleCheckbox('location')
                                            }
                                        />
                                        <Checkbox
                                            label='Camera'
                                            checked={checked.camera}
                                            onToggle={() =>
                                                toggleCheckbox('camera')
                                            }
                                        />
                                        <Checkbox
                                            label='Microphone'
                                            checked={checked.microphone}
                                            onToggle={() =>
                                                toggleCheckbox('microphone')
                                            }
                                        />
                                    </Collapsible>
                                    <Collapsible
                                        title='Security'
                                        isOpen={openSections.security}
                                        onToggle={() =>
                                            toggleSection('security')
                                        }
                                        checked={checked.security}
                                        onCheck={() =>
                                            toggleCheckbox('security')
                                        }
                                    >
                                        <Checkbox
                                            label='Two-Factor Auth.'
                                            checked={checked.twoFactorAuth}
                                            onToggle={() =>
                                                toggleCheckbox('twoFactorAuth')
                                            }
                                        />
                                        <Checkbox
                                            label='Backup Codes'
                                            checked={checked.backupCodes}
                                            onToggle={() =>
                                                toggleCheckbox('backupCodes')
                                            }
                                        />
                                    </Collapsible>
                                </Collapsible>
                                <Collapsible
                                    title='Preferences'
                                    isOpen={openSections.preferences}
                                    onToggle={() =>
                                        toggleSection('preferences')
                                    }
                                    checked={checked.preferences}
                                    onCheck={() =>
                                        toggleCheckbox('preferences')
                                    }
                                >
                                    <Collapsible
                                        title='Theme'
                                        isOpen={openSections.theme}
                                        onToggle={() => toggleSection('theme')}
                                        checked={checked.theme}
                                        onCheck={() => toggleCheckbox('theme')}
                                    >
                                        <Checkbox
                                            label='Dark Mode'
                                            checked={checked.darkMode}
                                            onToggle={() =>
                                                toggleCheckbox('darkMode')
                                            }
                                        />
                                        <Checkbox
                                            label='High Contrast'
                                            checked={checked.highContrast}
                                            onToggle={() =>
                                                toggleCheckbox('highContrast')
                                            }
                                        />
                                    </Collapsible>
                                    <Collapsible
                                        title='Language'
                                        isOpen={openSections.language}
                                        onToggle={() =>
                                            toggleSection('language')
                                        }
                                        checked={checked.language}
                                        onCheck={() =>
                                            toggleCheckbox('language')
                                        }
                                    >
                                        <Checkbox
                                            label='English'
                                            checked={checked.english}
                                            onToggle={() =>
                                                toggleCheckbox('english')
                                            }
                                        />
                                        <Checkbox
                                            label='Spanish'
                                            checked={checked.spanish}
                                            onToggle={() =>
                                                toggleCheckbox('spanish')
                                            }
                                        />
                                        <Collapsible
                                            title='Regional Dialects'
                                            isOpen={
                                                openSections.regionalDialects
                                            }
                                            onToggle={() =>
                                                toggleSection(
                                                    'regionalDialects'
                                                )
                                            }
                                            checked={checked.regionalDialects}
                                            onCheck={() =>
                                                toggleCheckbox(
                                                    'regionalDialects'
                                                )
                                            }
                                        >
                                            <Checkbox
                                                label='Catalan'
                                                checked={checked.catalan}
                                                onToggle={() =>
                                                    toggleCheckbox('catalan')
                                                }
                                            />
                                            <Checkbox
                                                label='Quechua'
                                                checked={checked.quechua}
                                                onToggle={() =>
                                                    toggleCheckbox('quechua')
                                                }
                                            />
                                        </Collapsible>
                                    </Collapsible>
                                </Collapsible>
                                <Collapsible
                                    title='Integrations'
                                    isOpen={openSections.integrations}
                                    onToggle={() =>
                                        toggleSection('integrations')
                                    }
                                    checked={checked.integrations}
                                    onCheck={() =>
                                        toggleCheckbox('integrations')
                                    }
                                >
                                    <Checkbox
                                        label='Slack'
                                        checked={checked.slack}
                                        onToggle={() => toggleCheckbox('slack')}
                                    />
                                    <Collapsible
                                        title='GitHub'
                                        isOpen={openSections.github}
                                        onToggle={() => toggleSection('github')}
                                        checked={checked.github}
                                        onCheck={() => toggleCheckbox('github')}
                                    >
                                        <Checkbox
                                            label='Issues'
                                            checked={checked.issues}
                                            onToggle={() =>
                                                toggleCheckbox('issues')
                                            }
                                        />
                                        <Checkbox
                                            label='Pull Requests'
                                            checked={checked.pullRequests}
                                            onToggle={() =>
                                                toggleCheckbox('pullRequests')
                                            }
                                        />
                                    </Collapsible>
                                    <Collapsible
                                        title='Jira'
                                        isOpen={openSections.jira}
                                        onToggle={() => toggleSection('jira')}
                                        checked={checked.jira}
                                        onCheck={() => toggleCheckbox('jira')}
                                    >
                                        <Checkbox
                                            label='Basic'
                                            checked={checked.basic}
                                            onToggle={() =>
                                                toggleCheckbox('basic')
                                            }
                                        />
                                        <Collapsible
                                            title='Advanced'
                                            isOpen={openSections.advanced}
                                            onToggle={() =>
                                                toggleSection('advanced')
                                            }
                                            checked={checked.advanced}
                                            onCheck={() =>
                                                toggleCheckbox('advanced')
                                            }
                                        >
                                            <Checkbox
                                                label='Workflows'
                                                checked={checked.workflows}
                                                onToggle={() =>
                                                    toggleCheckbox('workflows')
                                                }
                                            />
                                            <Checkbox
                                                label='Automations'
                                                checked={checked.automations}
                                                onToggle={() =>
                                                    toggleCheckbox(
                                                        'automations'
                                                    )
                                                }
                                            />
                                        </Collapsible>
                                    </Collapsible>
                                </Collapsible>
                            </View>
                            <Text className='text-2xl font-bold'>
                                Calender Logs
                            </Text>
                            <View className='w-full bg-gray-200 rounded-lg p-4 gap-2'>
                                <FlashCalendar
                                    date={selectedDate}
                                    onChange={setSelectedDate}
                                    today={today}
                                />
                                <TextInput
                                    className='bg-white rounded-md p-4 h-28 line-height
                                    '
                                    placeholder={`Enter notes for ${selectedDate}`}
                                    multiline={true}
                                    numberOfLines={10}
                                    value={log}
                                    onChangeText={(text) => setLog(text)}
                                    textAlignVertical='top'
                                />
                            </View>
                            <SimpleButton
                                label={
                                    isSubmitting
                                        ? 'Saving...'
                                        : 'Save Settings + Log'
                                }
                                disabled={isSubmitting}
                                onPress={() => {
                                    handleSubmit(name, checked)
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Patient
