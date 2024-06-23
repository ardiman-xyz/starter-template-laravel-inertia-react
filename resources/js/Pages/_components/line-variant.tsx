import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';
import {CustomTooltip} from "@/Components/CustomTooltip";

interface PerubahanData {
    tahun: string;
    peningkatan: number;
    penurunan: number;
    tetap: number;
}

const data = [
    {
        year: 2020,
        ganjil: 75.5,
        genap: 76.2,
    },
    {
        year: 2021,
        ganjil: 77.8,
        genap: 78.5,
    },
    {
        year: 2022,
        ganjil: 76.9,
        genap: 75.6,
    },
    {
        year: 2023,
        ganjil: 74.1,
        genap: 75.8,
    },
    {
        year: 2024,
        ganjil: 77.3,
        genap: 78.0,
    },
];

export const LineVariant: React.FC = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={16}
                />
                <YAxis
                    domain={[70, 100]}
                    tickMargin={16}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip content={<CustomTooltip />}/>
                <Line dataKey="genap" fill="#3d82f6" name="genap" className="drop-shadow-sm" />
                <Line dataKey="ganjil" fill="#82ca9d" name="ganjil" className="drop-shadow-sm"/>
            </LineChart>
        </ResponsiveContainer>
    );
};

