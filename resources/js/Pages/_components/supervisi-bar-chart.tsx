// components/SupervisiBarChart.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/Components/ui/card";
import { TrendingUp } from "lucide-react";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    CartesianGrid,
    Tooltip,
    Cell,
    Legend,
} from "recharts";

interface ChartDataItem {
    name: string;
    nilai: number;
    total: number;
    fill: string;
}

const getBarColor = (score: number) => {
    if (score >= 90) return "hsl(var(--chart-3))"; // Sangat Baik - Green
    if (score >= 80) return "hsl(var(--chart-2))"; // Baik - Blue
    if (score >= 70) return "hsl(var(--chart-1))"; // Cukup - Yellow
    return "hsl(var(--chart-4))"; // Kurang - Red
};

const SupervisiBarChart = ({ data }: any) => {
    const groupedData = data.reduce((acc: any, curr: any) => {
        const year = curr.academic_year;
        if (!acc[year]) {
            acc[year] = {
                year,
                ganjil: 0,
                genap: 0,
                ganjilTotal: 0,
                genapTotal: 0,
                ganjilFill: "",
                genapFill: "",
            };
        }

        if (curr.semester.toLowerCase() === "ganjil") {
            acc[year].ganjil = curr.average_score;
            acc[year].ganjilTotal = curr.total_supervisi;
            acc[year].ganjilFill = getBarColor(curr.average_score);
        } else {
            acc[year].genap = curr.average_score;
            acc[year].genapTotal = curr.total_supervisi;
            acc[year].genapFill = getBarColor(curr.average_score);
        }

        return acc;
    }, {});

    const chartData = Object.values(groupedData);

    // Calculate trend
    const getRecentTrend = () => {
        if (chartData.length < 2) return 0;
        const lastData = chartData[chartData.length - 1] as any;
        const prevData = chartData[chartData.length - 2] as any;
        const lastAvg = (lastData.ganjil + lastData.genap) / 2;
        const prevAvg = (prevData.ganjil + prevData.genap) / 2;
        return ((lastAvg - prevAvg) / prevAvg) * 100;
    };

    const trend = getRecentTrend();

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
                            <CartesianGrid
                                vertical={false}
                                stroke="var(--bar-chart-grid)"
                            />
                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) =>
                                    value.charAt(0).toUpperCase() +
                                    value.slice(1)
                                }
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                <div className="grid gap-2">
                                                    <p className="font-semibold">
                                                        {data.year}
                                                    </p>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-muted-foreground text-xs">
                                                                Semester Ganjil
                                                            </p>
                                                            <p className="font-semibold">
                                                                {data.ganjil}%
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {
                                                                    data.ganjilTotal
                                                                }{" "}
                                                                supervisi
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted-foreground text-xs">
                                                                Semester Genap
                                                            </p>
                                                            <p className="font-semibold">
                                                                {data.genap}%
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {
                                                                    data.genapTotal
                                                                }{" "}
                                                                supervisi
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Legend />
                            <Bar
                                name="Semester Ganjil"
                                dataKey="ganjil"
                                radius={[4, 4, 0, 0]}
                            >
                                {chartData.map((entry: any, index) => (
                                    <Cell
                                        key={`cell-ganjil-${index}`}
                                        fill={
                                            entry.ganjilFill ||
                                            "hsl(var(--primary))"
                                        }
                                    />
                                ))}
                            </Bar>
                            <Bar
                                name="Semester Genap"
                                dataKey="genap"
                                radius={[4, 4, 0, 0]}
                            >
                                {chartData.map((entry: any, index) => (
                                    <Cell
                                        key={`cell-genap-${index}`}
                                        fill={
                                            entry.genapFill ||
                                            "hsl(var(--secondary))"
                                        }
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                {trend !== 0 && (
                    <div className="flex gap-2 font-medium leading-none">
                        Trending {trend > 0 ? "up" : "down"} by{" "}
                        {Math.abs(trend).toFixed(1)}% this year{" "}
                        <TrendingUp className="h-4 w-4" />
                    </div>
                )}
                <div className="leading-none text-muted-foreground">
                    Showing supervisi scores for all academic years
                </div>
            </CardFooter>
        </Card>
    );
};

export default SupervisiBarChart;
