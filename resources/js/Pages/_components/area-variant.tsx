import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "@/Components/CustomTooltip";
import { useDashboardStore } from "@/Context/useDashboardStore";

export const AreaVariant = () => {
    const trendVisitation = useDashboardStore((state) => state.trendVisitation);

    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={trendVisitation}>
                <CartesianGrid strokeDasharray="3 3" />
                <defs>
                    <linearGradient id="genap" x1="0" x2="0" y2={"1"}>
                        <stop
                            offset="2%"
                            stopColor="#3d82f6"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="98%"
                            stopColor="#3d82f6"
                            stopOpacity={0.8}
                        />
                    </linearGradient>
                    <linearGradient id="ganjil" x1="0" x2="0" y2={"1"}>
                        <stop
                            offset="2%"
                            stopColor="#82ca9d"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="98%"
                            stopColor="#82ca9d"
                            stopOpacity={0.8}
                        />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={16}
                />
                <YAxis
                    domain={[10, 100]}
                    tickMargin={16}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                    type="monotone"
                    dataKey="genap"
                    stroke="#3d82f6"
                    fill="url(#genap)"
                    fillOpacity={0.3}
                    name="Semester Genap"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
                <Area
                    type="monotone"
                    dataKey="ganjil"
                    stroke="#82ca9d"
                    fill="url(#ganjil)"
                    fillOpacity={0.3}
                    name="Semester Ganjil"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};
