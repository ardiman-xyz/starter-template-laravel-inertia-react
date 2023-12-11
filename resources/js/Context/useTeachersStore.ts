import axios from "axios";
import {create} from "zustand";
import {User as Teacher} from "@/types/app";


const useTeachersStore = create(set => ({
    teachers: [] as Teacher[],
    fetchTeachers: async (): Promise<Teacher[]>  => {

        const teachers: Teacher[] = [];

        if(teachers.length) {
            return teachers;
        }

        if(teachers.length) return teachers;

        const res = await axios.get('/visitation/teachers');

        set({
            teachers: res.data.teachers
        })
        return res.data;
    }
}));

export default useTeachersStore;
