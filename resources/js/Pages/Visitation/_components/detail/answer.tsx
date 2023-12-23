import {useState} from "react";
import {ChevronDown} from "lucide-react";

import Heading from "@/Components/Heading";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import {Hint} from "@/Components/Hint";
import {cn} from "@/lib/utils";


export const Answer = () => {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="flex justify-between bg-gray-100 rounded p-4">
                <Heading
                    title={`Tanggapan Guru`}
                    description={`Ini adalah bagian di mana Anda dapat melihat jawaban dan tanggapan dari guru yang Anda visitasi.`}
                />
                <Hint description={isOpen ? "Close section": "Open section"} >
                    <ChevronDown onClick={handleClick} className={`transition-transform duration-500 ${isOpen ? "" : "transform -rotate-90"}`} />
                </Hint>
            </div>

            <Table className={cn("border mt-4 transition-all duration-500", !isOpen && "hidden")}>

            <TableHeader>
                    <TableRow>
                        <TableHead>Jawaban guru</TableHead>
                        <TableHead>Tanggal submit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
