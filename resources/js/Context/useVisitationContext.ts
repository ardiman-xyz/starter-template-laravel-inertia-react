import { create, } from 'zustand';

interface Store {
    assessmentId: string | null;
    stageName: string | null;
    setAssessmentId: (id: string) => void;
    setStageName: (id: string) => void;
}

const useInstrumentStageStore = create<Store>((set) => ({
    assessmentId: null,
    stageName: null,
    setAssessmentId: (id) => set(() => ({ assessmentId: id })),
    setStageName: (id) => set(() => ({ stageName: id })),
}));

export default useInstrumentStageStore;
