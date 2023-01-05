import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { MyOrganizationComponent } from './my-organization/my-organization.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports:      [ BrowserModule, FormsModule, BrowserAnimationsModule, ReactiveFormsModule, MaterialModule ],
  declarations: [ AppComponent, MyOrganizationComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
