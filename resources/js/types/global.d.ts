import { AxiosInstance } from "axios";

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    // Definisi untuk parameter route yang lebih fleksibel
    type RouteParamValue = string | number | boolean | null | undefined;
    type RouteParams =
        | RouteParamValue
        | Record<string, RouteParamValue>
        | RouteParamValue[];

    // Definisi fungsi route yang menerima berbagai tipe parameter
    var route: {
        (name: string): string;
        (name: string, params: RouteParams): string;
        (name: string, params?: RouteParams, absolute?: boolean): string;
        (
            name: string,
            params?: RouteParams,
            absolute?: boolean,
            config?: any
        ): string;
    };
}
