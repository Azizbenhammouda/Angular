import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Greeting } from './greeting/greeting';

export const routes: Routes = [
  { path: '', component: Home },           
  { path: 'home', component: Home },       
  { path: 'about', component: About },     
  { path: 'greeting', component: Greeting }
];
