import {Button} from "@/Components/ui/button";
import {PlusCircle} from "lucide-react";

const FooterModal = () => {
    return (
        <div className="bg-gray-200 fixed bottom-0 left-0 right-0 px-6 py-4 shadow">
            <div className="w-full flex items-center justify-between">
                <div className="text-muted-foreground">
                    Jumlah items : 10
                </div>
                <div>
                    <Button
                        size="lg"
                        className="md:px-14 md:py-6"
                    >
                        <PlusCircle className="mr-2 j-4 w-4" />
                        Tambah</Button>
                </div>
                <div className="text-muted-foreground">
                    Jumlah skor = 19
                </div>
            </div>
        </div>
    )
}

export default FooterModal;
