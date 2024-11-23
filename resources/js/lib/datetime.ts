// src/utils/datetime.ts

type DateTimeFormat = "date" | "time" | "datetime" | "full" | "short";

export const formatDateTime = (
    datetime: string | Date,
    format: DateTimeFormat = "datetime"
): string => {
    const date = new Date(datetime);

    // Handle invalid date
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    try {
        switch (format) {
            case "date":
                return date.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                });

            case "time":
                return date.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                });

            case "datetime":
                return `${date.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })} ${date.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}`;

            case "short":
                return date.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                });

            case "full":
                return date.toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                });

            default:
                return date.toLocaleString("id-ID");
        }
    } catch (error) {
        console.error("Error formatting date:", error);
        return datetime.toString();
    }
};

// Helper untuk memisahkan tanggal dan waktu
export const splitDateTime = (datetime: string) => {
    const date = new Date(datetime);

    return {
        date: formatDateTime(date, "date"),
        time: formatDateTime(date, "time"),
    };
};

// Helper untuk format durasi/range waktu
export const formatDateTimeRange = (start: string, end: string) => {
    const startDate = splitDateTime(start);
    const endDate = splitDateTime(end);

    // Jika tanggal sama
    if (startDate.date === endDate.date) {
        return `${startDate.date} (${startDate.time} - ${endDate.time})`;
    }

    // Jika tanggal berbeda
    return `${startDate.date} ${startDate.time} s/d ${endDate.date} ${endDate.time}`;
};

// Helper untuk cek apakah waktu sudah lewat
export const isDatePassed = (datetime: string): boolean => {
    const date = new Date(datetime);
    const now = new Date();
    return date < now;
};

// Helper untuk cek apakah waktu masih dalam range
export const isWithinDateRange = (
    datetime: string,
    start: string,
    end: string
): boolean => {
    const date = new Date(datetime);
    const startDate = new Date(start);
    const endDate = new Date(end);
    return date >= startDate && date <= endDate;
};
