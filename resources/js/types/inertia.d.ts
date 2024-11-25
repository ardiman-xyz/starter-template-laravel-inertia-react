import { User } from ".";
import { School } from "@/types/app";

interface Auth {
    user: User | null;
    roles: string[];
    school: School;
    teacher_school: School | null;
}

interface Ziggy {
    [key: string]: any;
    location: string;
    url: string;
}

interface App {
    locale: string;
}

export interface SharedInertiaData extends Record<string, unknown> {
    auth?: Auth;
    ziggy?: Ziggy;
    app?: App;
}
