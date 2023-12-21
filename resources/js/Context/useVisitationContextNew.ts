import { create, } from 'zustand';

interface Store {
    assessmentId: string | null;
    setAssessmentId: (id: string) => void;
}

const useVisitationStore = create<Store>((set) => ({
    assessmentId: null,
    setAssessmentId: (id) => set(() => ({ assessmentId: id })),
}));

export default useVisitationStore;
