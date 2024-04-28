import React, { FC } from 'react'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import { BarChartColors, BarChartData } from '../../../helpers/types/types.tsx'

interface SimpleBarChartProps {
    barChartData: BarChartData[]
    barChartColors: BarChartColors
}

const SimpleBarChart: FC<SimpleBarChartProps> = ({ barChartData, barChartColors }) => {
    const dataKeys = Object.keys(barChartData[0])

    return (
        <>
            <div>
                <h5>Количество человек</h5>
                <BarChart
                    width={500}
                    height={300}
                    data={barChartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={dataKeys[0]} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {
                        dataKeys.slice(1).map(key => (
                            <Bar dataKey={key} fill={barChartColors[key]} />
                        ))
                    }
                </BarChart>
            </div>
        </>

    )
}

export default SimpleBarChart
