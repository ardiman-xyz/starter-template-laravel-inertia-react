import {Schedule} from "@/types/app";
import {Button} from "@/Components/ui/button";
import {UploadCloud} from "lucide-react";


interface IProps {
    id: number;
    name: string;
    scheduled?: Schedule
}

export const StageAction = ({id, name, scheduled}: IProps) => {

    return (
        <div>
            {
                scheduled?.status ? (
                    <Button>
                        <UploadCloud className="h-4 w-4 mr-2" />
                        Upload
                    </Button>
                ) : (
                    <p>-</p>
                )
            }
        </div>
    )
}
