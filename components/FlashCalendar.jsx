import {
    Calendar,
    toDateId,
    CalendarTheme,
} from '@marceloterreiro/flash-calendar'
import { useState } from 'react'
import { Text, View } from 'react-native'

const FlashCalendar = ({ today, date, onChange }) => {
    return (
        <View>
            <Calendar
                calendarActiveDateRanges={[
                    {
                        startId: date,
                        endId: date,
                    },
                ]}
                calendarMonthId={today}
                onCalendarDayPress={onChange}
            />
        </View>
    )
}

export default FlashCalendar
