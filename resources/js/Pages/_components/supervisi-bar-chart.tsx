// components/SupervisiBarChart.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/Components/ui/card";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface SupervisiAverageData {
    academic_year: string;
    semester: string;
    average_score: number;
    total_supervisi: number;
}

interface SupervisiBarChartProps {
    data: SupervisiAverageData[];
}

const SupervisiBarChart = ({ data }: SupervisiBarChartProps) => {
    const chartData = data.map((item) => ({
        period: `${item.semester} ${item.academic_year}`,
        nilai: item.average_score,
        supervisi: item.total_supervisi,
    }));

    // Hitung trend
    const calculateTrend = () => {
        if (chartData.length < 2) return 0;
        const lastTwo = chartData.slice(-2);
        return ((lastTwo[1].nilai - lastTwo[0].nilai) / lastTwo[0].nilai) * 100;
    };

    const trend = calculateTrend();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Statistik Nilai Supervisi</CardTitle>
                <CardDescription>Per Semester Akademik</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid vertical={false} stroke="#f0f0f0" />
                            <XAxis
                                dataKey="period"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) =>
                                    value.charAt(0).toUpperCase() +
                                    value.slice(1)
                                }
                            />
                            <Tooltip
                                cursor={false}
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Nilai
                                                        </span>
                                                        <span className="font-bold text-muted-foreground">
                                                            {payload[0].value?.toFixed(
                                                                2
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Total
                                                        </span>
                                                        <span className="font-bold text-muted-foreground">
                                                            {
                                                                chartData.find(
                                                                    (d) =>
                                                                        d.period ===
                                                                        label
                                                                )?.supervisi
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar
                                dataKey="nilai"
                                fill="hsl(var(--primary))"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    {trend !== 0 && (
                        <>
                            {trend > 0 ? "Meningkat" : "Menurun"} sebesar{" "}
                            {Math.abs(trend).toFixed(1)}%
                            {trend > 0 ? (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                                <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                        </>
                    )}
                </div>
                <div className="leading-none text-muted-foreground">
                    Menampilkan rata-rata nilai supervisi {chartData.length}{" "}
                    semester terakhir
                </div>
            </CardFooter>
        </Card>
    );
};

export default SupervisiBarChart;
