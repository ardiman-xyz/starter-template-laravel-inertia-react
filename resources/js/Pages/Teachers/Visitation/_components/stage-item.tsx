import {Instrument} from "@/types/app";
import {cn} from "@/lib/utils";

interface StageItemProps {
    stage: {
        name:string;
        isAllFinished: boolean;
        instruments: Instrument[],
    };
    index: number;
    stages: any [];
    onStageClick : (name: string) => void;
    activeStage: string;
}

const StageItemLayout = ({stage, index, stages, onStageClick, activeStage}: StageItemProps) => {
    return (
        <>
            <div className="flex items-center cursor-pointer" onClick={() => onStageClick(stage.name)}>
                <span className={`rounded-full h-8 w-8 flex items-center justify-center ${stage.isAllFinished ? "bg-green-800": " bg-gray-300 "}`}>{index + 1}</span>
                <span className={cn("ml-2 font-semibold", activeStage === stage.name && "text-sky-600")}>{stage.name}</span>
            </div>
            {
                index < stages.length - 1 && (
                    <div className="h-0.5 bg-gray-300 flex-1"></div>
                )
            }
        </>
    )
}

export default StageItemLayout;
