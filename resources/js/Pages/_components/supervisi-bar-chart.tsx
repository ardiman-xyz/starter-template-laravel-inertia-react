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
    Cell,
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
    const chartData: ChartDataItem[] = data.map((item: any) => ({
        name: `${item.semester} ${item.academic_year}`,
        nilai: item.average_score,
        total: item.total_supervisi,
        fill: getBarColor(item.average_score),
    }));
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
                                cursor={false}
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                <div className="grid gap-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Semester
                                                        </span>
                                                        <span className="font-bold text-sm text-muted-foreground capitalize">
                                                            {label}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between gap-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                Rata-rata
                                                            </span>
                                                            <span className="font-bold">
                                                                {data.nilai.toFixed(
                                                                    2
                                                                )}
                                                                %
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                Total
                                                            </span>
                                                            <span className="font-bold">
                                                                {data.total}{" "}
                                                                supervisi
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Kategori
                                                        </span>
                                                        <span className="font-bold">
                                                            {data.nilai >= 90
                                                                ? "Sangat Baik"
                                                                : data.nilai >=
                                                                  80
                                                                ? "Baik"
                                                                : data.nilai >=
                                                                  70
                                                                ? "Cukup"
                                                                : "Kurang"}
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
                                radius={[4, 4, 0, 0]}
                                fill="url(#gradient)"
                            >
                                {chartData.map(
                                    (entry: ChartDataItem, index: number) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.fill}
                                        />
                                    )
                                )}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Legend */}
                        <div className="flex items-center gap-2">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{ background: "hsl(var(--chart-1))" }}
                            />
                            <span>Sangat Baik (≥90)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{ background: "hsl(var(--chart-2))" }}
                            />
                            <span>Baik (80-89)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{ background: "hsl(var(--chart-3))" }}
                            />
                            <span>Cukup (70-79)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{ background: "hsl(var(--chart-4))" }}
                            />
                            <span>Kurang (≤69)</span>
                        </div>
                    </div>
                </div>
                <div className="leading-none text-muted-foreground mt-4">
                    Menampilkan rata-rata nilai supervisi per semester
                </div>
            </CardFooter>
        </Card>
    );
};

export default SupervisiBarChart;
