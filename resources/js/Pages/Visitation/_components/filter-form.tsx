import React, {useState} from "react";
import {Search} from "lucide-react";
import {Link, router} from "@inertiajs/react";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/Components/ui/select";
import {Button} from "@/Components/ui/button";

interface FilterFormProps {
    data : {
        academic_year: string
    }[]
}

const FilterForm = ({data}: FilterFormProps) => {


    const [filterForm, setFilterForm] = useState({
        selectedYear: "",
        selectedSemester: ""
    });

    const handleChange = (value: string, name: string) => {
        setFilterForm((prevData) => ({ ...prevData, [name]: value }));
    };

    const isEmpty = filterForm.selectedSemester === "" && filterForm.selectedSemester === "";

    const handleFilterAction = () => {
        if(isEmpty)return;

        return router.visit(route("visitation.filter", {
            academic_year: filterForm.selectedYear,
            smt: filterForm.selectedSemester
        }));

    }

    return (
        <div className="md:w-1/2 w-full flex md:flex-row flex-col  items-center md:gap-x-4 gap-x-0 gap-y-2 md:gap-y-0">
            <Select name="selectedYear" onValueChange={(e) => handleChange(e, "selectedYear")}>
                <SelectTrigger className="md:w-[180px] w-full">
                    <SelectValue placeholder="Tahun akademik"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        data.map((item, i) => (
                            <SelectItem key={i} value={item.academic_year}>{item.academic_year}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>

            <Select name="selectedSemester" onValueChange={(e) => handleChange(e, "selectedSemester")}>
                <SelectTrigger className="md:w-[180px] w-full">
                    <SelectValue placeholder="Semester"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ganjil">Ganjil</SelectItem>
                    <SelectItem value="genap">Genap</SelectItem>
                </SelectContent>
            </Select>

            <Button disabled={isEmpty} onClick={handleFilterAction} className="px-7 w-full md:w-max">
                <Search className="h-4 w-4 mr-2 "/>
                Filter
            </Button>
        </div>
    )
}

export default FilterForm;
