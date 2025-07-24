import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import { FormError } from "@/Components/FormError";

interface FormUploadProps {
    onFileChange: (file: File | undefined) => void;
    acceptedFileTypes?: string;
    maxFileSize?: number;
    isLoading?: boolean;
    error?: string;
}

export const FormUpload: React.FC<FormUploadProps> = ({
    onFileChange,
    acceptedFileTypes = "image/*",
    maxFileSize = 2 * 1024 * 1024, // 2MB
    isLoading = false,
    error,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | undefined>(undefined);
    const [preview, setPreview] = useState<string | undefined>(undefined);

    const handleDivClick = (): void => {
        if (isLoading) return;
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            if (selectedFile.size > maxFileSize) {
                console.error("File size exceeds the limit");
                return;
            }
            setFile(selectedFile);
            if (selectedFile.type.startsWith("image/")) {
                setPreview(URL.createObjectURL(selectedFile));
            } else {
                setPreview(undefined);
            }
            onFileChange(selectedFile);
        }
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <div>
            <div
                onClick={handleDivClick}
                className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer`}
            >
                {file === undefined ? (
                    <p>Click to select a file</p>
                ) : (
                    <p>{file.name}</p>
                )}
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="mt-4 mx-auto max-w-full h-auto"
                    />
                )}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept={acceptedFileTypes}
            />
            {error && <FormError message={error} />}
        </div>
    );
};
