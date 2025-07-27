import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
    ChevronDown,
    FileText,
    Check,
    AlertCircle,
    Eye,
    Calendar,
    Download,
    File,
    X,
} from "lucide-react";

import Heading from "@/Components/Heading";
import { Hint } from "@/Components/Hint";
import { Button } from "@/Components/ui/button";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Badge } from "@/Components/ui/badge";

// Backend data interface
export interface BackendTeachingDeviceData {
    is_uploaded: boolean;
    file_name?: string;
    file_size?: string;
    file_path?: string;
    uploaded_at?: string;
}

interface TeachingDeviceViewProps {
    initialData?: BackendTeachingDeviceData;
}

const TeachingDeviceView = ({ initialData }: TeachingDeviceViewProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleView = () => {
        if (initialData?.file_path) {
            const fileUrl = `/storage/${initialData.file_path}`;
            window.open(fileUrl, "_blank");
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const isUploaded = initialData?.is_uploaded || false;

    // UI State: Not Uploaded
    const NotUploadedUI = () => (
        <div className="mt-4 border rounded-lg bg-white">
            <Alert className="m-4 bg-red-50 border-red-200 rounded-lg">
                <X className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                    Perangkat pembelajaran belum diupload oleh guru. Supervisi
                    tidak dapat dilanjutkan.
                </AlertDescription>
            </Alert>

            <div className="p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-100 rounded-lg">
                        <FileText className="h-6 w-6 text-red-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg text-red-600">
                                Perangkat Pembelajaran
                            </h3>
                            <Badge variant="destructive" className="text-xs">
                                Belum Upload
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            Guru belum mengupload dokumen perangkat pembelajaran
                            yang diperlukan untuk supervisi
                        </p>

                        <div className="border border-red-200 rounded-lg p-6 text-center bg-red-50">
                            <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-3" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-red-600">
                                    Dokumen Belum Tersedia
                                </p>
                                <p className="text-xs text-red-500">
                                    Menunggu guru untuk mengupload perangkat
                                    pembelajaran
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // UI State: Uploaded
    const UploadedUI = () => (
        <div className="mt-4 border rounded-lg bg-white">
            <Alert className="m-4 bg-green-50 border-green-200 rounded-lg">
                <Check className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                    Perangkat pembelajaran telah diupload dan siap untuk
                    direview dalam supervisi.
                </AlertDescription>
            </Alert>

            <div className="p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                        <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg text-green-800">
                                Perangkat Pembelajaran
                            </h3>
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                                <Check className="w-3 h-3 mr-1" />
                                Sudah Upload
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            File perangkat pembelajaran telah berhasil diupload
                            dan siap untuk direview
                        </p>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded">
                                        <File className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-blue-900">
                                            {initialData?.file_name}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-blue-700 mt-1">
                                            {initialData?.file_size && (
                                                <span className="flex items-center gap-1">
                                                    <Download className="h-3 w-3" />
                                                    {initialData.file_size}
                                                </span>
                                            )}
                                            {initialData?.uploaded_at && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(
                                                        initialData.uploaded_at
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-green-600 font-medium">
                                        File Tersedia
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                onClick={handleView}
                                className="flex items-center gap-2"
                            >
                                <Eye className="w-4 h-4" />
                                Lihat File
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full">
            <div className="flex justify-between bg-gradient-to-r from-emerald-50 to-teal-50 rounded border-t-2 border-emerald-600 p-4">
                <Heading
                    title="Perangkat Pembelajaran"
                    description="Status upload perangkat pembelajaran untuk supervisi"
                />
                <Hint description={isOpen ? "Tutup section" : "Buka section"}>
                    <ChevronDown
                        onClick={handleClick}
                        className={`transition-transform duration-500 cursor-pointer hover:text-emerald-600 ${
                            isOpen ? "" : "transform -rotate-90"
                        }`}
                    />
                </Hint>
            </div>

            <div
                className={cn(
                    "transition-all duration-500",
                    !isOpen && "hidden"
                )}
            >
                {isUploaded ? <UploadedUI /> : <NotUploadedUI />}
            </div>
        </div>
    );
};

export default TeachingDeviceView;
