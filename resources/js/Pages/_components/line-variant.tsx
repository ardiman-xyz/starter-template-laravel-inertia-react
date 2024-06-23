import React from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';
import {CustomTooltip} from "@/Components/CustomTooltip";
import {useDashboardStore} from "@/Context/useDashboardStore";

export const LineVariant: React.FC = () => {

    const trendVisitation = useDashboardStore(state => state.trendVisitation);

    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={trendVisitation}>
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

