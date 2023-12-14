import { User } from ".";

interface Auth {
    user: User | null;
    roles: string[];
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
