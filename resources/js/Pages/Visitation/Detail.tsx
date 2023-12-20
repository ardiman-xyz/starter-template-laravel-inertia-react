import {useEffect, useState} from "react";
import {Head} from "@inertiajs/react";

import {Assessment, StageSchedule} from "@/types/app";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {StageDetail} from "@/Pages/Visitation/_components/stage-detail";
import useVisitationContext from "@/Context/useVisitationContext";
import Heading from "@/Components/Heading";

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
                        title : data.assessment.teacher.name,
                        url: "",
                        disabled: true,
                    },
                ]
            }
        >
            <Head title="Supervisi detail" />
            <Heading
                title={`Visitasi ${data.assessment.teacher.name}`}
                description={`List instrument dan nilai dari ${data.assessment.teacher.name}`}
            />
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
