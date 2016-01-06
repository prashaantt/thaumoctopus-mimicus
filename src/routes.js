import { App, About, Home } from './shared/components';


const routes = [
    {
        path: '/',
        component: App,
        childRoutes: [
            {
                path: 'home',
                component: Home
            },
            {
                path: 'about',
                component: About
            }
        ]
    }
];


export default routes;
