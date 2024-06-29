import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {GoogleOAuthProvider} from "@react-oauth/google";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({el, App, props}) {
        const root = createRoot(el);

        root.render(
            <GoogleOAuthProvider clientId="439515953413-n1ru2cg3jqhfavlgavp6lincmrimjhi1.apps.googleusercontent.com">
                <App {...props} />
            </GoogleOAuthProvider>,
        )
    },
    progress: {
        color: '#4B5563',
    },
}).then();
