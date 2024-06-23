import {Separator} from "@/Components/ui/separator";

export const CustomTooltip = ({active, payload}: any) => {

    if(!active) return null;

    const year = payload[0].payload.year;
    const ganjil = payload[0].value;
    const genap = payload[1].value;

    return (
        <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
            <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
                Tahun akademik {year}
            </div>
            <Separator/>
            <div className="p-2 px-3 space-y-1">
                <div className="flex items-center justify-between gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <div className="p-2 rounded-full bg-[#3d82f6]"/>
                        <p className="text-sm text-muted-foreground">
                            Ganjil
                        </p>
                    </div>
                    <p className="text-sm text-right font-medium">
                        {ganjil}
                    </p>
                </div>
                <div className="flex items-center justify-between gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <div className="p-2 rounded-full bg-[#82ca9d]"/>
                        <p className="text-sm text-muted-foreground">
                            Genap
                        </p>
                    </div>
                    <p className="text-sm text-right font-medium">
                        {genap}
                    </p>
                </div>
            </div>
        </div>
    )

}
