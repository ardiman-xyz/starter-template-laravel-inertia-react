import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

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

const VisitationChart = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={[70, 85]} />
                <Tooltip />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="ganjil"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                    name="Semester Ganjil"
                />
                <Area
                    type="monotone"
                    dataKey="genap"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                    name="Semester Genap"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default VisitationChart;
