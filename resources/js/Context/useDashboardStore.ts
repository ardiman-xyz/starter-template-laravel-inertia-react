import {create} from 'zustand';
import { VisitationTrend, VisitationTrendCategories} from "@/types/app"

interface DashboardState {
    trendVisitation: VisitationTrend[];
    setTrendVisitation: (trends: VisitationTrend[]) => void;
    categoryDistribution: VisitationTrendCategories[];
    setCategoryDistribution: (categories: VisitationTrendCategories[]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    trendVisitation: [],
    setTrendVisitation: (trends) => set({ trendVisitation: trends }),
    categoryDistribution: [],
    setCategoryDistribution: (categories) => set({ categoryDistribution: categories }),
}));
