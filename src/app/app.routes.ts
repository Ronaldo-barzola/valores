import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ProcesoComponent } from './pages/proceso/proceso.component';
import { ListadoContribComponent } from './pages/listado-contrib/listado-contrib.component';

export const ROUTES: Routes = [
    { path: 'proceso', component: ProcesoComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'listado-contrib/:numpro', component: ListadoContribComponent },
];
