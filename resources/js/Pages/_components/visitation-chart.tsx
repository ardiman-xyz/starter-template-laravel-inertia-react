import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const VisitationChart = () => {
    const [selectedYear, setSelectedYear] = useState("2023");
    const [selectedSemester, setSelectedSemester] = useState("Spring");
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Di sini Anda perlu mengambil data Anda dari server atau tempat lain
        // Untuk contoh ini, kita akan menggunakan data dummy
        const data = [
            ["Teacher", "Visits"],
            ["Teacher A", 100],
            ["Teacher B", 75],
            ["Teacher C", 50],
            // Tambahkan lebih banyak data sesuai kebutuhan
        ];

        // @ts-ignore
        setChartData(data);
    }, [selectedYear, selectedSemester]);

    return (
        <div>
            <h1>Dashboard</h1>

            <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
            >
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                // Tambahkan lebih banyak tahun sesuai kebutuhan
            </select>

            <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
            >
                <option value="Spring">Spring</option>
                <option value="Fall">Fall</option>
                // Tambahkan lebih banyak semester sesuai kebutuhan
            </select>

            <Chart
                width={"500px"}
                height={"300px"}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                    title: `Teacher Visits in ${selectedYear} (${selectedSemester})`,
                    chartArea: { width: "50%" },
                    hAxis: {
                        title: "Total Visits",
                        minValue: 0,
                    },
                    vAxis: {
                        title: "Teacher",
                    },
                }}
            />
        </div>
    );
};

export default VisitationChart;
