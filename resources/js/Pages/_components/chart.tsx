import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/Components/ui/card";
import {AreaVariant} from "@/Pages/_components/area-variant";
import {BarVariant} from "@/Pages/_components/bar-variant";
import {LineVariant} from "@/Pages/_components/line-variant";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import {useState} from "react";
import {AreaChartIcon, BarChartIcon, LineChartIcon} from "lucide-react";

export const Chart = () => {

    const [chartType, setChartType] = useState<string>("area");

    const onTypeChange = (value: string) => {
        setChartType(value)
    }

    return (
        <div className="flex flex-col gap-y-10">
            <Card>
                <CardHeader className="flex lg:flex-row flex-col justify-between lg:gap-2 gap-0">
                   <div className='space-y-1'>
                       <CardTitle>Trend Visitasi Guru</CardTitle>
                       <CardDescription className="max-w-[600px] text-xs">Visualisasi performa mengajar berdasarkan hasil visitasi semester ganjil dan genap
                           selama 5 tahun terakhir</CardDescription>
                   </div>
                    <Select
                        defaultValue={chartType}
                        onValueChange={onTypeChange}
                    >
                        <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                            <SelectValue placeholder="Chart type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="area">
                                <div className="flex items-center">
                                    <AreaChartIcon className="h-4 w-4 mr-2 shrink-0" />
                                    <p className="line-clamp-1">Area Chart</p>
                                </div>
                            </SelectItem>
                            <SelectItem value="line">
                                <div className="flex items-center">
                                    <LineChartIcon className="h-4 w-4 mr-2 shrink-0" />
                                    <p className="line-clamp-1">Line Chart</p>
                                </div>
                            </SelectItem>
                            <SelectItem value="bar">
                                <div className="flex items-center">
                                    <BarChartIcon className="h-4 w-4 mr-2 shrink-0" />
                                    <p className="line-clamp-1">Bar Chart</p>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent>
                    {chartType === "area" && <AreaVariant/>}
                    {chartType === "line" && <LineVariant/>}
                    {chartType === "bar" && <BarVariant/>}
                </CardContent>
            </Card>
        </div>
    )
}
