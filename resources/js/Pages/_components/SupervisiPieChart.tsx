// components/SupervisiPieChart.tsx
import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/Components/ui/chart";
import { CategoryData } from "@/types/dashboard";

interface SupervisiPieChartProps {
    data: CategoryData[];
}

const chartConfig = {
    value: {
        label: "Total",
    },
    "Sangat Baik": {
        label: "Sangat Baik",
        color: "hsl(var(--chart-1))", // atau "#22c55e"
    },
    Baik: {
        label: "Baik",
        color: "hsl(var(--chart-2))", // atau "#3b82f6"
    },
    Cukup: {
        label: "Cukup",
        color: "hsl(var(--chart-3))", // atau "#eab308"
    },
    Kurang: {
        label: "Kurang",
        color: "hsl(var(--chart-4))", // atau "#ef4444"
    },
};

export const SupervisiPieChart = ({ data }: SupervisiPieChartProps) => {
    // Transform data untuk format yang dibutuhkan chart
    const chartData = data.map((item) => ({
        category: item.name,
        value: item.value,
        fill: item.color,
    }));

    const totalSupervisi = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.value, 0);
    }, [chartData]);

    // Hitung trend
    const trend = React.useMemo(() => {
        // Logika perhitungan trend bisa disesuaikan
        return data[0]?.percent - (data[1]?.percent || 0);
    }, [data]);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Distribusi Kategori Nilai</CardTitle>
                <CardDescription>Tahun Akademik 2023/2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid gap-1">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="h-2 w-2 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                data.fill,
                                                        }}
                                                    />
                                                    <span className="font-medium">
                                                        {data.category}
                                                    </span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Total
                                                        </span>
                                                        <span className="font-bold">
                                                            {data.value}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Persentase
                                                        </span>
                                                        <span className="font-bold">
                                                            {Math.abs(
                                                                trend
                                                            ).toFixed(0)}
                                                            %
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="category"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalSupervisi}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total Supervisi
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                {trend !== 0 && (
                    <div className="flex items-center gap-2 font-medium leading-none">
                        {trend > 0 ? "Meningkat" : "Menurun"} sebesar{" "}
                        {Math.abs(trend).toFixed(1)}%
                        {trend > 0 ? (
                            <TrendingUp className="h-4 w-4" />
                        ) : (
                            <TrendingDown className="h-4 w-4" />
                        )}
                    </div>
                )}
                <div className="leading-none text-muted-foreground">
                    Menampilkan distribusi nilai supervisi semester ini
                </div>
            </CardFooter>
        </Card>
    );
};
