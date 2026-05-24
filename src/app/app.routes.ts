import { Routes } from '@angular/router';
import { Punto1 } from './components/punto1/punto1';
import { Punto2 } from './components/punto2/punto2';
import { Punto3 } from './components/punto3/punto3';
import { Punto4 } from './components/punto4/punto4';
import { Punto5 } from './components/punto5/punto5';

export const routes: Routes = [
    { path: 'punto1', component: Punto1 },
    { path: 'punto2', component: Punto2 },
    { path: 'punto3', component: Punto3 },
    { path: 'punto4', component: Punto4 },
    { path: 'punto5', component: Punto5 },
    { path: '', redirectTo: '/punto1', pathMatch: 'full'},
    { path: '**', redirectTo: '/punto1' }
];
