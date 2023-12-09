import {Head, Link} from "@inertiajs/react";
import {Search} from "lucide-react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import Heading from "@/Components/Heading";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import {Button} from "@/Components/ui/button";

const IndexPage = () => {

    return(
        <Authenticated>
            <Head title="Visitasi" />

            <Heading
                title="Visitasi"
                description="Manajemen visitasi di akun anda"
            />
            <div className="w-full flex md:flex-row flex-col mt-7">
                <div className="md:w-1/2 w-full flex md:flex-row flex-col  items-center md:gap-x-4 gap-x-0 gap-y-2 md:gap-y-0">
                    <Select>
                        <SelectTrigger className="md:w-[180px] w-full">
                            <SelectValue placeholder="Tahun akademik"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2023/2024">2023/2024</SelectItem>
                            <SelectItem value="2024/2025">2024/2025</SelectItem>
                            <SelectItem value="2025/2026">2025/2026</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="md:w-[180px] w-full">
                            <SelectValue placeholder="Semester"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ganjil">Ganjil</SelectItem>
                            <SelectItem value="genap">Genap</SelectItem>
                        </SelectContent>
                    </Select>

                   <Link href={route("visitation.filter", 45)}>
                       <Button className="px-7 w-full md:w-max">
                           <Search className="h-4 w-4 mr-2 "/>
                           Filter
                       </Button>
                   </Link>
                </div>
                <div className="md:w-1/2 w-full">
                    List agenda visitasi
                </div>
            </div>
        </Authenticated>
    )
}

export default IndexPage;
