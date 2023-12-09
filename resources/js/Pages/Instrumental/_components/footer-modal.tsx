import {Button} from "@/Components/ui/button";
import {PlusCircle} from "lucide-react";
import {useState} from "react";
import CreateInstrumentItemModal from "@/Pages/Instrumental/_components/create-instrument-item-modal";

interface IProps {
    instrumentId : number;
    getData: () => void;
    items: {
        id: number;
        title: string;
        max_score: number;
    }[]
}

const FooterModal = ({instrumentId, getData, items}: IProps) => {

    const [modalInstrumentItem, setModalInstrumentItem] = useState<boolean>(false);

    const toggleModalItems = () => setModalInstrumentItem(!modalInstrumentItem);

    const totalItems = items ? items.length : 0;
    let totalScore = 0;

    if(items) {
        items.forEach(item => {
            totalScore += item.max_score
        })
    }

    return (
        <div className="bg-gray-200 fixed bottom-0 left-0 right-0 px-6 py-4 shadow">
            <div className="w-full flex items-center justify-between">
                <div className="text-muted-foreground">
                    Jumlah items : {totalItems}
                </div>
                <div>
                    <Button
                        size="lg"
                        className="md:px-14 md:py-6"
                        onClick={toggleModalItems}
                    >
                        <PlusCircle className="mr-2 j-4 w-4" />
                        Tambah</Button>
                </div>
                <div className="text-muted-foreground">
                    Total skor = {totalScore}
                </div>
            </div>
            {
                modalInstrumentItem && (
                    <CreateInstrumentItemModal getData={getData} instrumentId={instrumentId} onClose={toggleModalItems} />
                )
            }
        </div>
    )
}

export default FooterModal;
