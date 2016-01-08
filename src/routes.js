import { App, Counter, Home, Todos } from './shared/components';


const routes = [
    {
        path: '/',
        component: App,
        indexRoute: { component: Home },
        childRoutes: [
            {
                path: 'todos',
                component: Todos
            },
            {
                path: 'counter',
                component: Counter
            }
        ]
    }
];


export default routes;
