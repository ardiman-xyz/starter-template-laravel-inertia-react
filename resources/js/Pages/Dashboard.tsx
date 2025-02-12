import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { Chart } from "@/Pages/_components/chart";
import { AvatarProfile } from "@/Pages/_components/avatar-profile";
import { PieVariant } from "@/Pages/_components/pie-variant";
import { SchoolProfile } from "@/Pages/_components/school-profile";
import { VisitationTrend, VisitationTrendCategories } from "@/types/app";
import { useDashboardStore } from "@/Context/useDashboardStore";
import { useEffect } from "react";
import { SupervisiPieChart } from "./_components/SupervisiPieChart";
import SupervisiBarChart from "./_components/supervisi-bar-chart";
import { CategoryData } from "@/types/dashboard";

type SupervisiAverageData = {
    academic_year: string;
    semester: string;
    average_score: number;
    total_supervisi: number;
};

interface DashboardProps {
    trendVisitation: VisitationTrend[];
    categories: CategoryData[];
    averages: SupervisiAverageData[];
}

const Dashboard = ({
    trendVisitation,
    categories,
    averages,
}: DashboardProps) => {
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
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex overflow-hidden md:flex-row flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 w-full">
                    <div className="col-span-1 lg:col-span-4">
                        <div className="w-full mb-8">
                            <SchoolProfile />
                            <SupervisiBarChart data={averages} />
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-2">
                        <div className="hidden lg:flex mb-10">
                            <AvatarProfile />
                        </div>
                        <div className="">
                            <SupervisiPieChart data={categories} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
