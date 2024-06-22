import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerubahanData {
    tahun: string;
    peningkatan: number;
    penurunan: number;
    tetap: number;
}

const data: PerubahanData[] = [
    { tahun: '2020', peningkatan: 30, penurunan: 10, tetap: 60 },
    { tahun: '2021', peningkatan: 40, penurunan: 15, tetap: 45 },
    { tahun: '2022', peningkatan: 35, penurunan: 20, tetap: 45 },
    { tahun: '2023', peningkatan: 45, penurunan: 10, tetap: 45 },
    { tahun: '2024', peningkatan: 50, penurunan: 5, tetap: 45 },
];

const PerubahanKinerjaGuru: React.FC = () => {
    return (
        <div style={{ width: '100%', height: 400 }}>
            <h2>Perubahan Kinerja Guru per Tahun</h2>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tahun" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="peningkatan" fill="#82ca9d" name="Peningkatan" />
                    <Bar dataKey="penurunan" fill="#ff8042" name="Penurunan" />
                    <Bar dataKey="tetap" fill="#8884d8" name="Tetap" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PerubahanKinerjaGuru;
