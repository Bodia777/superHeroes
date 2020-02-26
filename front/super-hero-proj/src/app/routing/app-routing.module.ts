import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputHeroComponent } from '../components/input-hero/input-hero.component';
import { HeroListComponent } from '../components/hero-list/hero-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'new_Hero', pathMatch: 'full' },
  { path: 'new_Hero', component: InputHeroComponent },
  { path: 'superhero_list', component: HeroListComponent },
//   { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
//   { path: 'news', component: NewsRouterComponent,
//    canActivate: [AuthGuard],
//   children: [
//     { path: '', component: NewsComponent },
//     { path: 'details/:id', component: ItemDetailsComponent}
//   ]
// },
//   { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
//   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
