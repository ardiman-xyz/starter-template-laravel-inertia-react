export function getFirstTwoLettersOfLastName(fullName: string): string {
    const names = fullName.split(" ");
    const lastName = names[names.length - 1];
    return lastName.substring(0, 2);
}

interface ValidFile {
    name: string;
    size: number;
    type: string;
}

export function isValidImage(file: ValidFile) {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    return allowedTypes.includes(file.type);
}

export function isValidSize(file: ValidFile) {
    const maxSizeInBytes = 1024 * 1024; // 1 MB
    return file.size <= maxSizeInBytes;
}

export function formatDate(value: string) {
    const date = new Date(value);

    return `${date.getDate()}/${
        date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

export const formatIndonesianDateTime = (dateTimeString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };

    const date = new Date(dateTimeString);
    return date.toLocaleDateString("id-ID", options);
};

export const formatIndonesianDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
};
