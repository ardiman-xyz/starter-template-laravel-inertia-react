import {Instrument} from "@/types/app";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import {Badge} from "@/Components/ui/badge";
import {StageAction} from "@/Pages/Visitation/_components/stage-action";
import useVisitationContext from "@/Context/useVisitationContext";
import {useEffect} from "react";


interface StageDetailProps {
    instruments: Instrument[];
    stage:any
}

export const StageDetail = ({instruments, stage}: StageDetailProps) => {
    console.info(instruments)

    const { setStageName } = useVisitationContext();

    useEffect(() => {
        setStageName(stage.name)
    },[instruments])

    return (
        <div>
            <Table className="border">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No.</TableHead>
                        <TableHead>Judul</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Skor Akhir</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        instruments.map((instrument, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{instrument.name}</TableCell>
                                <TableCell>
                                    {
                                        instrument.scheduled?.status === false ? (
                                            <Badge variant="destructive">
                                                Date not setup yet
                                            </Badge>
                                        ): (
                                            <ul>
                                                <li>
                                                    <span className="font-bold">Mulai</span> : {instrument.scheduled?.started_at}
                                                </li>
                                                <li>
                                                    <span className="font-bold">Berakhir</span> : {instrument.scheduled?.finished_at}
                                                </li>
                                            </ul>
                                        )
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        instrument.scheduled?.status === false && (
                                            <span>-</span>
                                        )
                                    }

                                    {
                                        instrument.scheduled?.status === true && (
                                            <Badge
                                                variant="secondary"
                                                className={instrument.scheduled.progress === "schedule" ? "bg-yellow-200": "bg-green-200"}
                                            >
                                                {instrument.scheduled.progress}
                                            </Badge>
                                        )
                                    }
                                </TableCell>
                                <TableCell>
                                    0
                                </TableCell>
                                <TableCell>
                                   <StageAction
                                        id={instrument.id}
                                        name={instrument.name}
                                        scheduled={instrument.scheduled?.status}
                                   />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}
