import './Statistics.scss'
import React from 'react'
import SimpleBarChart from './SimpleBarChart'
import PieChartWithCustomizedLabel from './PieChartWithCustomizedLabel'
import { useMultipleStudents } from '../../../helpers/hooks/useMultipleStudents'
import { useMultipleTrainers } from '../../../helpers/hooks/useMultipleTrainers'
// import { useGroups } from '../../../helpers/hooks/useGroups'
import { TextInput } from '@gravity-ui/uikit'
import { BarChartColors, BarChartData } from '../../../helpers/types/types.tsx'

function Statistics() {
    const { students } = useMultipleStudents()
    const { trainers } = useMultipleTrainers()
    // const { groups } = useGroups()
    const numOfStudents = students.length
    const numOfTrainers = trainers.length
    // const numOfGroups = groups.length

    const barChartData: BarChartData[] = [
        {
            name: "people",
            students: numOfStudents,
            trainers: numOfTrainers,
            // groups: numOfGroups,

        },
    ]

    const barChartColors: BarChartColors = {
        students: '#b82525',
        trainers: '#32ad1f',
        groups: '#2f2db4',
    }

    return (
        <>
            <h2>Общая статистика</h2>
            <div className='statistics-wrapper'>
                <div className='statistics-up'>
                    <div className='chart_data-wrapper'>
                        <TextInput label='Студенты:' view='clear' value={numOfStudents.toString()} />
                        <TextInput label='Тренеры:' view='clear' value={numOfTrainers.toString()} />
                        {/* <TextInput label='Группы:' view='clear' value={numOfGroups.toString()} /> */}
                    </div>
                    <div className='chart-wrapper'>
                        <SimpleBarChart barChartData={barChartData} barChartColors={barChartColors} />
                    </div>
                </div>
                <div className='statistics-down'>
                    <div className='chart_data-wrapper'>
                        <TextInput label='Клиенты:' view='clear' />
                        <TextInput label='Новые клиенты:' view='clear' />
                        <TextInput label='Доход:' view='clear' />
                        <TextInput label='Платежи:' view='clear' />
                    </div>
                    <div className='chart-wrapper'>
                        <PieChartWithCustomizedLabel />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Statistics
