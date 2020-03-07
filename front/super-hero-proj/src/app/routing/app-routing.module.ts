import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputHeroComponent } from '../components/input-hero/input-hero.component';
import { HeroListComponent } from '../components/hero-list/hero-list.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'new_Hero', pathMatch: 'full' },
  { path: 'new_Hero', component: InputHeroComponent },
  { path: 'superhero_list', component: HeroListComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
