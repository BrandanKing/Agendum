import { AuthRoutes } from './authentication';
import { Route404 } from './error';
import { GlobalRoutes } from './global';

const routes = [GlobalRoutes, AuthRoutes, Route404];

export default routes;
