import {useEffect, useState} from "react";
import {Head} from "@inertiajs/react";

import {Assessment, StageSchedule} from "@/types/app";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import StageItemLayout from "./_components/stage-item";
import {StageDetail} from "@/Pages/Visitation/_components/stage-detail";
import useVisitationContext from "@/Context/useVisitationContext";

interface DetailProps {
    data: {
        assessment: Assessment,
        stages: StageSchedule[]
    }
}

const DetailVisitationPage = ({data}: DetailProps) => {

    const { setAssessmentId } = useVisitationContext();
    const [activeStage, setActiveStage] = useState("");

    useEffect(() => {
        if (data.stages.some(stage => stage.name === "pra observasi")) {
            setActiveStage("pra observasi");
            setAssessmentId(data.assessment.id)
        }
    }, [data.stages]);

    const handleStageClick = (stageName: string) => {
        setActiveStage(stageName);
    }
    return(
        <Authenticated
            breadCrumbs={
                [
                    {
                        title : "Filter",
                        url: "visitation.index",
                        disabled: false
                    },
                    {
                        title : "Supervisi",
                        url: "visitation.filter",
                        disabled: false,
                        params: {
                            year: data.assessment.academic_semester.year,
                            smt: data.assessment.academic_semester.semester
                        }
                    },
                    {
                        title : "Detail",
                        url: "",
                        disabled: true,
                    },
                ]
            }
        >
            <Head title="Supervisi detail" />
            <div>
                <div className="py-8">
                    <div className="flex items-center justify-between space-x-4">
                        {
                            data.stages.map((stage, index) => (
                                <StageItemLayout
                                    stage={stage}
                                    index={index}
                                    stages={data.stages}
                                    onStageClick={handleStageClick}
                                    activeStage={activeStage}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="mt-4 w-full">
                {
                    activeStage !== "" && (
                        <StageDetail
                            stage={
                                data.stages.find(stage => stage.name === activeStage) || { id: "", name: "" }
                            }
                            instruments={
                                data.stages.find(stage => stage.name === activeStage)?.instruments || []
                            }
                        />
                    )
                }
            </div>
        </Authenticated>
    )
}

export default DetailVisitationPage;
