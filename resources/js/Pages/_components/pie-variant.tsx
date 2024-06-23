import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

import {Card, CardContent, CardHeader, CardTitle} from "@/Components/ui/card"
import {CategoryTooltip} from "@/Pages/_components/category-tooltip";

const data = [
    { name: 'Sangat Baik', value: 30 },
    { name: 'Baik', value: 45 },
    { name: 'Cukup', value: 20 },
    { name: 'Perlu Perbaikan', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const PieVariant = () => {
    return (<>
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <CardTitle>Kategori Penilaian</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width={"100%"} height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={90}
                            innerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CategoryTooltip />}/>
                        <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="right"
                            iconType="circle"
                            content={({payload}: any) => {
                                return (
                                    <ul className="flex flex-col space-y-2">
                                        {
                                            payload.map((entry: any, index: number) => (
                                                <li
                                                    key={`item-${index}`}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <span
                                                        className="p-2 rounded-full"
                                                        style={{backgroundColor: entry.color}}
                                                    />
                                                    <div className="space-x-1">
                                                        <span className="text-sm text-muted-foreground">
                                                            {entry.value}
                                                        </span>
                                                        <span className="text-sm">
                                                            {entry.payload.percent * 100} %
                                                        </span>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    </>

    );
};

