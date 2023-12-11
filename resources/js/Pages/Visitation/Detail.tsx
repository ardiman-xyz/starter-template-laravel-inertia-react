import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import {Assessment} from "@/types/app";

interface DetailProps {
    assessment: Assessment
}

const DetailVisitationPage = ({assessment}: DetailProps) => {

    console.info(assessment)

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
                            year: assessment.academic_semester.year,
                            smt: assessment.academic_semester.semester
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
                <div className=" mx-auto py-8">
                    <div className="flex items-center justify-between space-x-4">
                        {
                            assessment.assessment_steps.map((item, index) => (
                                <>
                                    <div className="flex items-center">
                                        <span
                                            className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center">1</span>
                                        <span className="ml-2 font-semibold">{item.assessment_stage.name}</span>
                                    </div>

                                    <div className="h-0.5 bg-gray-300 flex-1"></div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}

export default DetailVisitationPage;
