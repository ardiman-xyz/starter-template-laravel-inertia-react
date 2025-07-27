import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
    ChevronDown,
    Upload,
    FileText,
    Check,
    AlertCircle,
    Eye,
    Calendar,
    Download,
    File,
    X,
    Loader2,
} from "lucide-react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import axios from "axios";

import Heading from "@/Components/Heading";
import { Hint } from "@/Components/Hint";
import { Button } from "@/Components/ui/button";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Badge } from "@/Components/ui/badge";

interface TeachingDeviceData {
    uploaded: boolean;
    file_name?: string;
    file_size?: string;
    file_url?: string;
    uploaded_at?: string;
}

interface TeachingDeviceUploadProps {
    status: string;
    assessmentId: string;
    initialData?: TeachingDeviceData;
}

const TeachingDeviceUpload = ({
    status,
    assessmentId,
    initialData,
}: TeachingDeviceUploadProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [deviceData, setDeviceData] = useState<TeachingDeviceData>(
        initialData || { uploaded: false }
    );
    const [error, setError] = useState<string | null>(null);

    // Update deviceData when initialData changes
    useEffect(() => {
        if (initialData) {
            setDeviceData(initialData);
        }
    }, [initialData]);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleUpload = async () => {
        // Create file input element
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".pdf,.doc,.docx,.ppt,.pptx";
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                await uploadFile(file);
            }
        };
        input.click();
    };

    const uploadFile = async (file: File) => {
        try {
            setIsUploading(true);
            setError(null);

            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(
                `/teachers/visitation/${assessmentId}/teaching-device/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRF-TOKEN":
                            document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute("content") || "",
                    },
                }
            );

            if (response.data.success) {
                setDeviceData(response.data.data);
                toast.success("File berhasil diupload!");

                // Reload page to refresh all data
                setTimeout(() => {
                    router.reload();
                }, 1000);
            } else {
                const errorMsg =
                    response.data.message || "Gagal mengupload file";
                setError(errorMsg);
                toast.error(errorMsg);
            }
        } catch (err: any) {
            console.error("Upload error:", err);

            let errorMsg = "Gagal mengupload file. Silakan coba lagi.";

            if (err.response?.data?.message) {
                errorMsg = err.response.data.message;
            } else if (err.response?.status === 422) {
                // Validation errors
                const errors = err.response.data.errors;
                if (errors && typeof errors === "object") {
                    errorMsg = Object.values(errors).flat().join(", ");
                }
            } else if (err.response?.status === 413) {
                errorMsg =
                    "File terlalu besar. Maksimal ukuran file adalah 10MB.";
            }

            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsUploading(false);
        }
    };

    const handleView = () => {
        if (deviceData.file_url) {
            window.open(deviceData.file_url, "_blank");
        }
    };

    const handleRemove = async () => {
        if (!confirm("Apakah Anda yakin ingin menghapus file ini?")) {
            return;
        }

        try {
            setIsUploading(true);
            setError(null);

            const response = await axios.delete(
                `/teachers/visitation/${assessmentId}/teaching-device/remove`,
                {
                    headers: {
                        "X-CSRF-TOKEN":
                            document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute("content") || "",
                    },
                }
            );

            if (response.data.success) {
                setDeviceData(response.data.data);
                toast.success("File berhasil dihapus!");

                // Reload page to refresh all data
                setTimeout(() => {
                    router.reload();
                }, 1000);
            } else {
                const errorMsg =
                    response.data.message || "Gagal menghapus file";
                setError(errorMsg);
                toast.error(errorMsg);
            }
        } catch (err: any) {
            console.error("Remove error:", err);

            let errorMsg = "Gagal menghapus file. Silakan coba lagi.";

            if (err.response?.data?.message) {
                errorMsg = err.response.data.message;
            }

            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsUploading(false);
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

    const formatFileSize = (sizeString?: string) => {
        if (!sizeString) return "";
        return sizeString;
    };

    const isDisabled = status === "finish";

    // Show error state if there's an error
    if (error) {
        return (
            <div className="w-full">
                <div className="flex justify-between bg-gradient-to-r from-emerald-50 to-teal-50 rounded border-t-2 border-emerald-600 p-4">
                    <Heading
                        title="Upload Perangkat Pembelajaran"
                        description="Silakan upload perangkat pembelajaran yang diperlukan untuk supervisi"
                    />
                </div>
                <Alert className="mt-4 bg-red-50 border-red-200">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">
                        {error}
                        <Button
                            variant="link"
                            className="text-red-700 underline p-0 h-auto ml-2"
                            onClick={() => {
                                setError(null);
                                router.reload();
                            }}
                        >
                            Coba lagi
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    // UI State: Before Upload
    const BeforeUploadUI = () => (
        <div className="mt-4 border rounded-lg bg-white">
            <Alert className="m-4 bg-yellow-50 border-yellow-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-700">
                    Perangkat pembelajaran belum diupload. Silakan upload
                    dokumen yang diperlukan untuk melanjutkan supervisi.
                </AlertDescription>
            </Alert>

            <div className="p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                        <FileText className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg text-gray-600">
                                Perangkat Pembelajaran
                            </h3>
                            <Badge variant="destructive" className="text-xs">
                                Wajib
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            Upload dokumen perangkat pembelajaran seperti RPS,
                            Silabus, RPP, atau dokumen pendukung lainnya
                        </p>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-600">
                                    Belum ada file yang diupload
                                </p>
                                <p className="text-xs text-gray-500">
                                    Klik tombol di bawah untuk memilih dan
                                    upload file
                                </p>
                            </div>
                        </div>

                        <div className="mt-4">
                            {!isDisabled && (
                                <Button
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                    className="flex items-center gap-2"
                                    size="lg"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Mengupload...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4" />
                                            Pilih & Upload File
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // UI State: After Upload
    const AfterUploadUI = () => (
        <div className="mt-4 border rounded-lg bg-white">
            <Alert className="m-4 bg-green-50 border-green-200 rounded-lg">
                <Check className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                    Perangkat pembelajaran telah berhasil diupload! File siap
                    untuk direview dalam supervisi.
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
                                            {deviceData.file_name}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-blue-700 mt-1">
                                            {deviceData.file_size && (
                                                <span className="flex items-center gap-1">
                                                    <Download className="h-3 w-3" />
                                                    {formatFileSize(
                                                        deviceData.file_size
                                                    )}
                                                </span>
                                            )}
                                            {deviceData.uploaded_at && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(
                                                        deviceData.uploaded_at
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-green-600 font-medium">
                                        File Aktif
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {deviceData.file_url && (
                                <Button
                                    variant="outline"
                                    onClick={handleView}
                                    className="flex items-center gap-2"
                                    disabled={isUploading}
                                >
                                    <Eye className="w-4 h-4" />
                                    Lihat File
                                </Button>
                            )}

                            {!isDisabled && (
                                <>
                                    <Button
                                        onClick={handleUpload}
                                        disabled={isUploading}
                                        variant="secondary"
                                        className="flex items-center gap-2"
                                    >
                                        {isUploading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Mengganti...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-4 h-4" />
                                                Ganti File
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={handleRemove}
                                        disabled={isUploading}
                                        className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                                    >
                                        {isUploading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <X className="w-4 h-4" />
                                        )}
                                        Hapus
                                    </Button>
                                </>
                            )}
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
                    title="Upload Perangkat Pembelajaran"
                    description="Silakan upload perangkat pembelajaran yang diperlukan untuk supervisi"
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
                {deviceData.uploaded ? <AfterUploadUI /> : <BeforeUploadUI />}

                {!deviceData.uploaded && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-sm text-blue-800 mb-2">
                            Ketentuan Upload File:
                        </h4>
                        <ul className="text-xs text-blue-700 space-y-1">
                            <li>
                                • Format file yang diizinkan: PDF, DOC, DOCX,
                                PPT, PPTX
                            </li>
                            <li>• Ukuran maksimal file: 10MB</li>
                            <li>
                                • Pastikan file dapat dibuka dan dibaca dengan
                                baik
                            </li>
                            <li>
                                • Nama file sebaiknya menggambarkan isi dokumen
                            </li>
                            <li>
                                • File yang sudah diupload dapat diganti dengan
                                file baru
                            </li>
                            <li>
                                • File akan otomatis tersimpan dan dapat diakses
                                oleh supervisor
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeachingDeviceUpload;
