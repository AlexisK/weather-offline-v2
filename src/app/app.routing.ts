import {Routes, RouterModule} from '@angular/router';
import * as routes from './pages/routes';

const appRoutes: Routes = [];

for (let k in routes) {
    appRoutes.push(routes[k]);
}

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
