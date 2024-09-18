import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponentComponent } from './component/nav-component/nav-component.component';
import { FormsComponent } from './forms/forms.component';
import { FooterComponent } from './footer/footer.component';
import { EtapaComponent } from './etapa/etapa.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponentComponent,
    FormsComponent,
    FooterComponent,
    EtapaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
