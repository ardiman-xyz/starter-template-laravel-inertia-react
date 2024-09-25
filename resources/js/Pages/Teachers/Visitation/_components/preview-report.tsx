import PrintReportModal from "@/Components/PrintReportModal";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const PreviewReport = ({ isOpen, onClose }: IProps) => {
    return (
        <PrintReportModal
            isOpen={isOpen}
            onClose={onClose}
            title="Cetak laporan visitasi"
        >
            <div className="container mx-auto max-w-screen-2xl"></div>
        </PrintReportModal>
    );
};

export default PreviewReport;
