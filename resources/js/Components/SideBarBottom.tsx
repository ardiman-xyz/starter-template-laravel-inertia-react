import {Play} from "lucide-react";

const SideBarBottom = () => {
    return (
        <div className="absolute bottom-0 left-0 w-full p-4">
            <div className="bg-sky-700 p-4 rounded-lg flex items-center gap-x-2 cursor-pointer hover:shadow transition-all">
                <Play className="text-white fill-white w-4 h-4" />
                <p className="text-xs font-bold text-white">Lihat tata cara penggunaan</p>
            </div>
        </div>
    )
}

export default SideBarBottom;
