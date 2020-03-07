import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { ModalModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { InputHeroComponent } from './components/input-hero/input-hero.component';
import { ModalComponent } from './components/modal/modal.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeroItemComponent } from './components/hero-list/hero-item/hero-item.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    InputHeroComponent,
    ModalComponent,
    HeroListComponent,
    NavigationComponent,
    HeroItemComponent,
    PageNotFoundComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    NgBootstrapFormValidationModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent, LoaderComponent]
})
export class AppModule { }
