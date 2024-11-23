// src/lib/utils/date.ts

type DateFormat = "default" | "short" | "long" | "full" | "custom";

interface DateOptions {
    locale?: string;
    format?: DateFormat;
    customFormat?: string;
}

export const formatDate = (
    date: string | Date,
    options: DateOptions = {}
): string => {
    const { locale = "id-ID", format = "default", customFormat } = options;

    const dateObject = new Date(date);

    // Handle invalid date
    if (isNaN(dateObject.getTime())) {
        return "Invalid Date";
    }

    try {
        switch (format) {
            case "short":
                return dateObject.toLocaleDateString(locale, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                });

            case "long":
                return dateObject.toLocaleDateString(locale, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                });

            case "full":
                return dateObject.toLocaleDateString(locale, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                });

            case "custom":
                if (!customFormat) return dateObject.toLocaleDateString(locale);

                return customFormat.replace(/([DMY])+/g, (match) => {
                    const firstChar = match[0];
                    switch (firstChar) {
                        case "D":
                            return match.length === 1
                                ? dateObject.getDate().toString()
                                : dateObject
                                      .getDate()
                                      .toString()
                                      .padStart(2, "0");
                        case "M":
                            const month = dateObject.getMonth() + 1;
                            return match.length === 1
                                ? month.toString()
                                : month.toString().padStart(2, "0");
                        case "Y":
                            return match.length <= 2
                                ? dateObject.getFullYear().toString().slice(-2)
                                : dateObject.getFullYear().toString();
                        default:
                            return match;
                    }
                });

            default:
                return dateObject.toLocaleDateString(locale, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                });
        }
    } catch (error) {
        console.error("Error formatting date:", error);
        return dateObject.toLocaleDateString();
    }
};

// Optional: Helper untuk mendapatkan relative time
export const getRelativeTime = (
    date: string | Date,
    locale: string = "id-ID"
): string => {
    const timeMs = new Date(date).getTime();
    const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

    const cutoffs = [
        { seconds: 60, unit: "detik" },
        { seconds: 3600, unit: "menit" },
        { seconds: 86400, unit: "jam" },
        { seconds: 604800, unit: "hari" },
        { seconds: 2592000, unit: "minggu" },
        { seconds: 31536000, unit: "bulan" },
    ];

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

    for (const cutoff of cutoffs) {
        if (Math.abs(deltaSeconds) < cutoff.seconds) {
            return rtf.format(
                Math.round(deltaSeconds / (cutoff.seconds / 60)),
                cutoff.unit as Intl.RelativeTimeFormatUnit
            );
        }
    }

    return rtf.format(Math.round(deltaSeconds / 31536000), "year");
};

// Contoh penggunaan konstanta untuk format yang sering digunakan
export const DATE_FORMATS = {
    SHORT: "DD/MM/YY",
    MEDIUM: "DD/MM/YYYY",
    LONG: "D MMMM YYYY",
    FULL: "dddd, D MMMM YYYY",
} as const;
