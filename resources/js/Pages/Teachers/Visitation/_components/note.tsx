import { useState } from "react";
import {ChevronDown, PencilLine} from "lucide-react";

import Heading from "@/Components/Heading";
import {Hint} from "@/Components/Hint";
import {cn} from "@/lib/utils";
import {DataEmpty} from "@/Components/data-empty";

interface NoteProps {
    data : {
        action_plan?: string | null;
        findings?: string | null;
    }
}

export const Note = ({data}: NoteProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div>
            <div className="flex justify-between bg-gray-100 rounded p-4 border-t-2 border-sky-700">
                <Heading
                    title={`Temuan dan Tindak Lanjut Guru`}
                    description={`Silakan gunakan formulir di bawah ini untuk mencatat temuan Anda dan tindak lanjut yang guru akan lakukan dan perbaiki.`}
                />
                <Hint description={isOpen ? "Close section" : "Open section"}>
                    <ChevronDown onClick={handleClick} className={`transition-transform duration-500 ${isOpen ? "" : "transform -rotate-90"}`}/>
                </Hint>
            </div>


            <div className={cn("mt-3", !isOpen && "hidden")}>
                {
                    data.findings !== null && data.action_plan !== null ? (
                        <div className="mt-7 space-y-10 p-4">
                            <div>
                                <h3 className="font-semibold">Temuan</h3>
                                <p className="text-sm text-muted-foreground text-justify leading-relaxed">{data.findings}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Tindak Lanjut</h3>
                                <p className="text-sm text-muted-foreground text-justify leading-relaxed">{data.action_plan}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-7">
                            <DataEmpty
                                Icon={PencilLine}
                                message={"Belum ada tanggapan"}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
