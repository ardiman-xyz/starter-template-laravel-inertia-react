import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { SchoolProfile } from "./_components/school-profile";
import { AvatarProfile } from "./_components/avatar-profile";
import { Chart } from "./_components/chart";
import { VisitationTrend, VisitationTrendCategories } from "@/types/app";
import { useDashboardStore } from "@/Context/useDashboardStore";
import { useEffect } from "react";
import { PieVariant } from "../_components/pie-variant";

interface DashboardProps {
    trendVisitation: VisitationTrend[];
    categories: VisitationTrendCategories[];
}

const DashboardTeacher = ({ trendVisitation, categories }: DashboardProps) => {
    const setTrendVisitation = useDashboardStore(
        (state) => state.setTrendVisitation
    );
    const setCategoryDistribution = useDashboardStore(
        (state) => state.setCategoryDistribution
    );

    useEffect(() => {
        setTrendVisitation(trendVisitation);
        setCategoryDistribution(categories);
    }, [
        trendVisitation,
        setTrendVisitation,
        setTrendVisitation,
        setCategoryDistribution,
    ]);

    return (
        <Authenticated>
            <Head title="Dashboard" />
            <div className="flex overflow-hidden md:flex-row flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 w-full">
                    <div className="col-span-1 lg:col-span-4">
                        <div className="w-full mb-8">
                            <SchoolProfile />
                            <Chart />
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-2">
                        <div className="hidden lg:flex mb-10">
                            <AvatarProfile />
                        </div>
                        <div className="">
                            <PieVariant />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default DashboardTeacher;
